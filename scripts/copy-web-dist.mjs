import { rm, cp, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

const sourceDir = path.resolve('apps/web/dist');
const targetDir = path.resolve('dist');

async function main() {
  await access(sourceDir, constants.R_OK);
  await rm(targetDir, { recursive: true, force: true });
  await cp(sourceDir, targetDir, { recursive: true });
  console.log(`Copied ${sourceDir} -> ${targetDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
