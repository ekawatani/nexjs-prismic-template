const fs = require('fs');
const path = require('path');
const parse = require('html-react-parser');
const Fontmin = require('fontmin');
var rename = require('gulp-rename');
const i18n = require('../i18n.json');

const TEMP_DIR = path.join('../.tmp');
const PUBLIC_DIR = path.join('../public');
const FONT_DIR = path.join(PUBLIC_DIR, `fonts`);
const FONT_NAME = 'AppliMincho.ttf';

const extractCharacters = (locale) => {
  const characters = new Set();
  const localeData = JSON.parse(fs.readFileSync(`${TEMP_DIR}/${locale}.json`, 'utf8'));

  for (const textKey in localeData) {
    const textData = localeData[textKey];

    parse(textData, {
      replace: (node) => {
        if (node.type === 'text') {
          // Add a character one by one so duplicated characters are removed automatically.
          for (let character of node.data) {
            characters.add(character);
          }
        }
      },
    });
  }

  return [...characters];
};

const optimizeFont = (text, originalFontPath) => {
  new Fontmin()
    .src(originalFontPath)
    .use(Fontmin.otf2ttf())
    .dest(FONT_DIR)
    .use(rename(FONT_NAME))
    .use(Fontmin.glyph({
      text,
    }))
    .run();
};

const buildOptimizedFonts = () => {
  const extractedCharSet = new Set();

  for (const locale of i18n.locales) {
    const characters = extractCharacters(locale);
    
    // Use a set to remove duplicate characters across different languages.
    characters.forEach(extractedCharSet.add.bind(extractedCharSet));
  }

  const characters = [...extractedCharSet].join('');
  console.log(characters);
  optimizeFont(characters, `../fonts/appli-mincho.otf`);
};

buildOptimizedFonts();
