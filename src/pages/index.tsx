import fs from 'fs';
import React from 'react';
import type { GetStaticProps } from 'next';
import { Heading } from '../ui/components/Heading';
import { Link } from '../ui/components/Link';
import { Masthead } from '../ui/components/Masthead';
import { Content } from '../ui/components/layouts/containers.css/Content';
import { Page } from '../ui/templates/Page';
import { PageProps, getPageProps } from '../lib/page';
import { TestData, fetchTestData } from '../lib/testData';
import { t, tStr } from '../locale/text';

export interface IndexProps extends PageProps {
  testData: TestData[];
}

const Index: React.FunctionComponent<IndexProps> = props => {
  return (
    <Page
      title={tStr(props.text.title) as string}
      description={tStr(props.text.siteDescription) as string}
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
  const pageProps = await getPageProps(context.locale);
  const testData = await fetchTestData(context.previewData);

  const outputFilePath = `${process.cwd()}/.tmp/index.txt`;
  if (!fs.existsSync(outputFilePath)) {
    for (const provider of testData.map(data => (() => data.title))) {
      fs.appendFileSync(outputFilePath, provider(), { encoding: 'utf8' });
    }
  }
  
  return {
    props: {
      ...pageProps,
      testData,
    },
  }
}

export default Index;
