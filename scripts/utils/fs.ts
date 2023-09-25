import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import prepareWrite from 'prepare-write';

export async function writeFileIfChanged(file: string, data: string) {
  if (existsSync(file)) {
    const old = readFileSync(file, 'utf8');
    if (old === data) return false;
  } else {
    await prepareWrite(file);
  }

  writeFileSync(file, data);
  return true;
}

export function getShortPath(file: string) {
  return path.relative(process.cwd(), file).replace(/\\/g, '/');
}
