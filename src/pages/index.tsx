import React from 'react';
import type { GetStaticProps } from 'next';
import { Heading } from '../components/Heading';
import { Link } from '../components/Link';
import { TestData, fetchTestData } from '../lib/testData';
import { t } from '../locale/locale';
import { PageProps, getPageProps } from '../shared/page';

export interface IndexProps extends PageProps {
  testData: TestData[];
}

const Index: React.FunctionComponent<IndexProps> = props => {
  return (
    <>
      <h1>{t(props.text.title)}</h1>

      <p>{t(props.text.siteDescription)}</p>

      {props.testData.length > 0 &&
        <>
          <Heading level={2}>{t(props.text.testDataListTitle)}</Heading>
          <ul>
            {props.testData.map(testData => (
              <li key={testData.id}>
                <Link href={testData.url}>{testData.title}</Link>
              </li>
            ))}
          </ul>
        </>
      }
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context): Promise<{ props: IndexProps }> => {
  const pageProps = getPageProps(context.locale);
  const testData = await fetchTestData(context.previewData);

  return {
    props: {
      ...pageProps,
      testData,
    },
  }
}

export default Index;
