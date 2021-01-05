import { LocalizedText } from '../locale/LocalizedText';
import { loadLocale } from '../locale/loader';

export interface PageProps {
  locale: string;
  text: LocalizedText;
}

export const getPageProps = async (locale: string): Promise<PageProps> => {
  const text = await loadLocale(locale);

  const props: PageProps = {
    locale,
    text,
  };

  return props;
};
