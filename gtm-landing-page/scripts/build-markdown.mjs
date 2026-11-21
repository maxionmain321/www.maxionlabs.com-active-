/**
 * Writes the Markdown copy of every money page into public/ (public/pricing.md, public/index.md, public/results/<case>.md)
 * so it is served as a static file at <page path>.md. Runs as `prebuild`. The copies are rendered from the same components
 * and content the pages use (lib/markdown/render.tsx), never hand-copied. Generated, gitignored.
 * Bundled with esbuild because the app router refuses to import react-dom/server inside the Next build.
 */
import { build } from 'esbuild'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(tmpdir(), `md-bundle-${process.pid}.cjs`)

await build({
  stdin: {
    contents: `export { markdownFor } from './lib/markdown/render'\nexport { MD_PATHS, mdUrlPath } from './lib/markdown/paths'`,
    resolveDir: root,
    loader: 'ts',
  },
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: out,
  jsx: 'automatic',
  alias: { '@': root },
  logLevel: 'error',
  define: { 'process.env.NODE_ENV': '"production"' },
})

const { markdownFor, MD_PATHS, mdUrlPath } = createRequire(import.meta.url)(out)
rmSync(out, { force: true })

for (const p of MD_PATHS) {
  const md = markdownFor(p)
  if (!md) throw new Error(`no Markdown for ${p}`)
  const file = join(root, 'public', mdUrlPath(p))
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, md)
}
console.log(`markdown copies: wrote ${MD_PATHS.length} files to public/`)
