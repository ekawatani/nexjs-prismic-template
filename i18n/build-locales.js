const path = require('path');
const i18npack = require('i18npack');
const i18n = require('../i18n.json');

i18npack.generate(path.join(process.cwd(), 'i18n/locales/**/*.yml'), {
  languages: i18n.locales,
  includeLangDetails: false,
  strict: true,
  mergeFilesAtRoot: true,
  dest: '../.tmp'
});
