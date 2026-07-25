import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export const basePath = '/spectrum-of-strengths/';

export function getAssetReferences(html) {
  return [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((reference) => reference.includes('/assets/'));
}

export async function validateBuildOutput({ outputDirectory = 'dist' } = {}) {
  const indexPath = resolve(outputDirectory, 'index.html');
  const html = await readFile(indexPath, 'utf8');
  const assetReferences = getAssetReferences(html);

  if (assetReferences.length === 0) {
    throw new Error(`No generated asset references found in ${indexPath}.`);
  }

  const invalidReferences = assetReferences.filter(
    (reference) => !reference.startsWith(basePath),
  );
  if (invalidReferences.length > 0) {
    throw new Error(
      `Generated assets must use the ${basePath} base path: ${invalidReferences.join(', ')}`,
    );
  }

  await Promise.all(
    assetReferences.map((reference) =>
      access(resolve(outputDirectory, `.${reference.slice(basePath.length - 1)}`)),
    ),
  );

  return assetReferences;
}

const isMainModule = process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.dirname, 'check-build-output.mjs');

if (isMainModule) {
  try {
    const assetReferences = await validateBuildOutput();
    console.log(`Build output check passed for ${assetReferences.length} generated assets.`);
  } catch (error) {
    console.error(`Build output check failed: ${error.message}`);
    process.exit(1);
  }
}
