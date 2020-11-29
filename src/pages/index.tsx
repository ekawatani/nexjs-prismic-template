import React from 'react';
import type { GetStaticProps } from 'next';
import { Heading } from '../components/Heading';
import { Link } from '../components/Link';
import { Masthead } from '../components/Masthead';
import { Content } from '../components/layouts/containers.css/Content';
import { Page } from '../components/templates/Page';
import { TestData, fetchTestData } from '../lib/testData';
import { t } from '../locale/locale';
import { PageProps, getPageProps } from '../shared/page';

export interface IndexProps extends PageProps {
  testData: TestData[];
}

const Index: React.FunctionComponent<IndexProps> = props => {
  return (
    <Page
      title={t(props.text.title, { ignoreFormatting: true }) as string}
      description={t(props.text.siteDescription, { ignoreFormatting: true }) as string}
    >
      <header role='banner'>

        <Masthead
          title={() => t(props.text.title)}
          subtitle={() => t(props.text.subtitle)}
        >

        </Masthead>

      </header>

      <main role='main'>

        <Content>
          <Heading level={2}>{t(props.text.testDataListTitle)}</Heading>

          {props.testData.length > 0 &&
            <ul>
              {props.testData.map(testData => (
                <li key={testData.id}>
                  <Link href={testData.url}>{testData.title}</Link>
                </li>
              ))}
            </ul>
          }
        </Content>

      </main>
    </Page>
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
