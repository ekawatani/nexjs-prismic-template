/* eslint-disable @typescript-eslint/no-var-requires */

import fs from 'fs';
import path from 'path';
const flat = require('flat');

const stringifyLocaleText = () => {
  const translationDir = '../src/locale/translations';
  const outputDir = '../.tmp';

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const fileNames = fs.readdirSync(translationDir);

  for (const fileName of fileNames) {
    const file = require(path.join(translationDir, fileName));

    const flattened = flat(file.default);

    // Remove values that have `null` values or it's an empty array since the Python code cannot handle them.
    const unsupportedKeys = Object.keys(flattened).filter(key => flattened[key] === null || isEmptyArray(flattened[key]));
    unsupportedKeys.forEach(key => {
      delete flattened[key];
    });

    const data = JSON.stringify(flattened);

    fs.writeFileSync(path.join(outputDir, `${path.parse(fileName).name}.json`), data);
  }
};

const isEmptyArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value) && value.length === 0;
};

stringifyLocaleText();
