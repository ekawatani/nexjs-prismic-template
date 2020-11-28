const i18nConfig = require('./i18n.json');

module.exports = {
  i18n: {
    locales: i18nConfig.locales,
    defaultLocale: i18nConfig.defaultLocale,
    localeDetection: false,
  },
};
