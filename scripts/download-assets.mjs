// Copies every image used by the site from the live site into /public, so you can host them yourself.
// Usage: npm run assets   (Node 18+). Afterwards set VITE_ASSET_BASE= (empty) and rebuild.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { ALL_ASSET_PATHS } from '../src/data/assets.js';

const FROM = 'https://designworldsalem.com';
let ok = 0, failed = 0;
for (const p of ALL_ASSET_PATHS) {
  try {
    const res = await fetch(`${FROM}/${p}`);
    if (!res.ok) throw new Error(res.status);
    const out = `public/${p}`;
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, Buffer.from(await res.arrayBuffer()));
    ok++;
  } catch (e) {
    failed++; console.warn(`skipped ${p} (${e.message})`);
  }
}
console.log(`Saved ${ok} files, ${failed} skipped. Now set VITE_ASSET_BASE= (empty) in .env and run npm run build.`);
