import { LocalizedText } from './LocalizedText';

export const loadLocale = async (locale: string): Promise<LocalizedText> => {
  const data = await import(`./translations/${locale}`);
  return data.default as LocalizedText;
};
