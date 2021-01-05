import React from 'react';
import i18nConfig from '../../i18n.json';

export interface ILocaleContext {
  locale: string;
}

const defaultLocaleContext: ILocaleContext = {
  locale: i18nConfig.defaultLocale,
};

export const LocaleContext = React.createContext<ILocaleContext>(defaultLocaleContext);
