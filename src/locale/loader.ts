import fs from 'fs';
import path from 'path';
import { LocalizedText } from './LocalizedText';

export const loadLocale = (locale: string): LocalizedText => {
  const tmpDirectory = path.join(process.cwd(), '.tmp');
  const data = JSON.parse(fs.readFileSync(`${tmpDirectory}/${locale}.json`, 'utf8'));

  return data as LocalizedText;
};
