const fs = require('fs');
const path = require('path');
const parse = require('html-react-parser');
const Fontmin = require('fontmin');
var rename = require('gulp-rename');
const i18n = require('../i18n.json');

/*
 * NOTE: This script must be executed from the project root because file paths are set relative to the root directory.
 */

const tmpDirectory = path.join('../.tmp');
const publicDirectory = path.join('../public');
const fontDirectory = path.join(publicDirectory, `fonts`);

const requiresOptimization = (locale) => {
  return locale === 'ja';
};

const getOriginalFont = (locale) => {
  switch (locale) {
    case 'ja':
      return 'appli-mincho.otf';
    default:
      throw new Error(`No original font found for locale ${locale}`);
  }
};

const extractText = (locale) => {
  const text = new Set();
  const localeData = JSON.parse(fs.readFileSync(`${tmpDirectory}/${locale}.json`, 'utf8'));

  for (const textKey in localeData) {
    const textData = localeData[textKey];

    parse(textData, {
      replace: (node) => {
        if (node.type === 'text') {
          // Add a character one by one so duplicated characters are removed automatically.
          for (let character of node.data) {
            text.add(character);
          }
        }
      },
    });
  }

  return [...text].join('');
};

const optimizeFont = (text, locale, originalFontPath) => {
  new Fontmin()
    .src(originalFontPath)
    .dest(fontDirectory)
    .use(rename(`fonts-${locale}.otf`))
    .use(Fontmin.glyph({
      text,
    }))
    .run();
};

const buildOptimizedFonts = () => {
  for (const locale of i18n.locales) {
    if (!requiresOptimization(locale)) {
      continue;
    }
  
    const text = extractText(locale);
    console.log(text);
    const originalFont = getOriginalFont(locale);
    optimizeFont(text, locale, `../fonts/${originalFont}`);
  }
};

buildOptimizedFonts();
