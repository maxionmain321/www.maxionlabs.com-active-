/**
 * Minimal HTML to Markdown for the server-rendered markup of our own pages (React output: well formed, no scripts that
 * matter). Not a general converter. It drops chrome (nav, svg, buttons, scripts), keeps headings, paragraphs, lists,
 * tables, definition lists, quotes, links (made absolute) and images, and never emits a dash or semicolon of its own.
 */

type El = { tag: string; attrs: Record<string, string>; children: Node[] }
type Node = El | string

const VOID = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'source', 'wbr'])
const SKIP = new Set(['script', 'style', 'svg', 'nav', 'header', 'footer', 'button', 'form', 'iframe', 'noscript', 'select', 'textarea', 'input', 'template', 'head', 'title'])
const BLOCK = new Set([
  'p', 'div', 'section', 'article', 'main', 'aside', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'table', 'figure', 'figcaption',
  'dl', 'dt', 'dd', 'details', 'summary', 'hr', 'pre', 'caption', 'address', 'tr',
])
const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', hellip: '...' }

function decode(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === '#') {
      const code = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)
      return String.fromCodePoint(code)
    }
    return ENTITIES[e.toLowerCase()] ?? m
  })
}

function parse(html: string): El {
  const root: El = { tag: 'root', attrs: {}, children: [] }
  const stack: El[] = [root]
  const re = /<!--[\s\S]*?-->|<\/([a-zA-Z0-9]+)\s*>|<([a-zA-Z][a-zA-Z0-9]*)((?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>|([^<]+|<)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(html))) {
    const top = stack[stack.length - 1]
    if (m[0].startsWith('<!--')) continue
    if (m[1]) {
      const tag = m[1].toLowerCase()
      for (let i = stack.length - 1; i > 0; i--) {
        if (stack[i].tag === tag) {
          stack.length = i
          break
        }
      }
    } else if (m[2]) {
      const tag = m[2].toLowerCase()
      const attrs: Record<string, string> = {}
      const ar = /([^\s=>\/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g
      let a: RegExpExecArray | null
      while ((a = ar.exec(m[3]))) attrs[a[1].toLowerCase()] = decode(a[2] ?? a[3] ?? a[4] ?? '')
      const el: El = { tag, attrs, children: [] }
      top.children.push(el)
      if (!VOID.has(tag) && !m[4]) stack.push(el)
    } else if (m[5] !== undefined) {
      top.children.push(decode(m[5]))
    }
  }
  return root
}

function find(el: El, tag: string): El | undefined {
  for (const c of el.children) {
    if (typeof c === 'string') continue
    if (c.tag === tag) return c
    const f = find(c, tag)
    if (f) return f
  }
  return undefined
}

const squash = (s: string) => s.replace(/\s+/g, ' ')

function absolute(href: string, base: string): string {
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href
  if (href.startsWith('/')) return base + href
  return href
}

class Converter {
  constructor(private base: string) {}

  inline(n: Node): string {
    if (typeof n === 'string') return squash(n)
    if (SKIP.has(n.tag) || n.attrs.hidden !== undefined || n.attrs['aria-hidden'] === 'true') return ''
    const inner = () => n.children.map((c) => this.inline(c)).join('')
    switch (n.tag) {
      case 'br':
        return ' '
      case 'a': {
        const text = inner().trim()
        const href = n.attrs.href
        if (!text) return ''
        if (!href || href.startsWith('#')) return text
        return `[${text}](${absolute(href, this.base)})`
      }
      case 'strong':
      case 'b': {
        const t = inner()
        return t.trim() ? `**${t.trim()}**` : ''
      }
      case 'em':
      case 'i': {
        const t = inner()
        return t.trim() ? `*${t.trim()}*` : ''
      }
      case 'code': {
        const t = inner()
        return t.trim() ? `\`${t.trim()}\`` : ''
      }
      case 'img':
        return n.attrs.alt ? `![${n.attrs.alt}](${absolute(n.attrs.src ?? '', this.base)})` : ''
      default:
        return inner()
    }
  }

  /** Children of a container as Markdown blocks: runs of inline nodes become one paragraph, block children recurse. */
  blocks(nodes: Node[]): string[] {
    const out: string[] = []
    let buf = ''
    const flush = () => {
      const t = buf.replace(/\s+/g, ' ').trim()
      if (t) out.push(t)
      buf = ''
    }
    for (const n of nodes) {
      if (typeof n === 'string' || !BLOCK.has(n.tag)) {
        buf += this.inline(n)
        continue
      }
      if (SKIP.has(n.tag)) continue
      flush()
      out.push(...this.block(n))
    }
    flush()
    return out
  }

  block(n: El): string[] {
    if (SKIP.has(n.tag) || n.attrs.hidden !== undefined || n.attrs['aria-hidden'] === 'true') return []
    const text = () => this.blocks(n.children).join(' ').trim()
    switch (n.tag) {
      case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6': {
        const t = text()
        return t ? ['#'.repeat(Number(n.tag[1])) + ' ' + t] : []
      }
      case 'ul':
      case 'ol': {
        const items = n.children.filter((c): c is El => typeof c !== 'string' && c.tag === 'li')
        const lines = items.map((li, i) => {
          const body = this.blocks(li.children).join('\n  ').trim()
          return (n.tag === 'ol' ? `${i + 1}. ` : '- ') + body
        })
        return lines.length ? [lines.join('\n')] : []
      }
      case 'blockquote': {
        const inner = this.blocks(n.children).join('\n\n')
        return inner ? [inner.split('\n').map((l) => (l ? `> ${l}` : '>')).join('\n')] : []
      }
      case 'table':
        return this.table(n)
      case 'dl': {
        const lines: string[] = []
        for (const c of n.children) {
          if (typeof c === 'string') continue
          // React renders each FAQ pair in a div inside the dl; flatten both shapes.
          const group = c.tag === 'div' ? c.children : [c]
          for (const g of group) {
            if (typeof g === 'string') continue
            const t = this.blocks(g.children).join(' ').trim()
            if (!t) continue
            lines.push(g.tag === 'dt' ? `### ${t}` : t)
          }
        }
        return lines
      }
      case 'hr':
        return []
      case 'pre':
        return ['```\n' + this.rawText(n).trim() + '\n```']
      case 'figcaption':
      case 'caption':
        return text() ? [`*${text()}*`] : []
      default:
        return this.blocks(n.children)
    }
  }

  rawText(n: Node): string {
    return typeof n === 'string' ? n : n.children.map((c) => this.rawText(c)).join('')
  }

  table(t: El): string[] {
    const rows: string[][] = []
    const caption: string[] = []
    const walk = (el: El) => {
      for (const c of el.children) {
        if (typeof c === 'string') continue
        if (c.tag === 'caption') caption.push(...this.block(c))
        else if (c.tag === 'tr') rows.push(c.children.filter((x): x is El => typeof x !== 'string' && (x.tag === 'td' || x.tag === 'th')).map((cell) => this.blocks(cell.children).join(' ').replace(/\|/g, '/').trim()))
        else walk(c)
      }
    }
    walk(t)
    if (!rows.length) return caption
    const width = Math.max(...rows.map((r) => r.length))
    const pad = (r: string[]) => `| ${Array.from({ length: width }, (_, i) => r[i] ?? '').join(' | ')} |`
    const lines = [pad(rows[0]), `| ${Array.from({ length: width }, () => '---').join(' | ')} |`, ...rows.slice(1).map(pad)]
    return [...caption, lines.join('\n')]
  }
}

/** Convert the page HTML to Markdown. Starts at the first h1 (anything above it is eyebrow chrome). */
export function htmlToMarkdown(html: string, base = 'https://www.maxionlabs.com'): string {
  const root = parse(html)
  const main = find(root, 'main') ?? root
  const md = new Converter(base).blocks(main.children).join('\n\n')
  const i = md.search(/^# /m)
  // House voice has no semicolons; a few source titles and one-liners carry them, so the Markdown copy uses a comma.
  return (i > 0 ? md.slice(i) : md).replace(/;(?=\s)/g, ',').trim() + '\n'
}
