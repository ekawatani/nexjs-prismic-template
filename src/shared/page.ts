import { LocalizedText } from '../locale/LocalizedText';
import { loadLocale } from '../locale/loader';

export interface PageProps {
  locale: string;
  text: LocalizedText;
}

export const getPageProps = (locale: string): PageProps => {
  const text = loadLocale(locale);

  const props: PageProps = {
    locale,
    text,
  };

  return props;
};
