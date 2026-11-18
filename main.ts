// news-image-20261117 entry (Node 22, standard library only).
// The judged artifact is the entry.png beside this file: one image summing up
// Tuesday 17 November 2026's world news. This program copies it to the output
// directory as entry.png. A plain copy is deterministic: run it twice and the
// bytes are identical both times.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = new URL('./entry.png', import.meta.url);
const target = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Confirm the copy landed whole: the gate takes a PNG of at most 1 MiB.
const bytes = statSync(target).size;
if (bytes > 1048576) throw new Error(`entry.png is ${bytes} bytes, over the 1 MiB gate limit`);
console.log(`copied entry.png (${bytes} bytes) to ${target}`);
