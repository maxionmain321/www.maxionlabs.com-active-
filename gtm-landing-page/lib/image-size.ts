import { readFileSync } from 'node:fs'
import path from 'node:path'

/**
 * Width and height of a PNG or JPEG under public/, read from the file header at render time on the server. The
 * /results hub uses it to pick the receipt whose shape fits a card thumbnail and to decide crop versus contain, so
 * no image dimension has to be hand-copied into a data file. Returns null for anything it cannot read, and the
 * caller treats null as "unknown shape".
 */
export function publicImageSize(src: string): { width: number; height: number } | null {
  try {
    const buf = readFileSync(path.join(process.cwd(), 'public', src))
    // PNG: 8-byte signature, then the IHDR chunk with width and height as big-endian 32-bit ints at 16 and 20.
    if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
    }
    // JPEG: walk the markers to the first start-of-frame, which carries height then width.
    if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
      let i = 2
      while (i + 9 < buf.length) {
        if (buf[i] !== 0xff) {
          i++
          continue
        }
        const marker = buf[i + 1]
        if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
          i += 2
          continue
        }
        const len = buf.readUInt16BE(i + 2)
        const isSof = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc
        if (isSof) return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) }
        i += 2 + len
      }
    }
    return null
  } catch {
    return null
  }
}
