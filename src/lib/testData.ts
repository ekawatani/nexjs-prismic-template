import { fetchData } from './fetch';

export interface TestData {
  id: string;
  title: string;
  url: string;
}

interface TestDataType {
  allTest_datas?: {
    edges?: Array<{
      node: {
        title: string;
        url: {
          url: string;
        };
        _meta: {
          id: string;
        };
      };
    }>;
  };
}

/**
 * Fetches all test data sorted by dates in descending order.
 */
export const fetchTestData = async (previewData: unknown): Promise<TestData[]> => {
  const data = await fetchData<TestDataType>(`
    {
      allTest_datas {
        edges {
          node {
            title
            url {
              ... on _ExternalLink{
                url
              }
            }
            _meta {
              id
            }
          }
        }
      }
    }
  `, { previewData });

  const nodes = data.allTest_datas?.edges?.map(edge => {
    const testData: TestData = {
      id: edge.node._meta.id,
      title: edge.node.title,
      url: edge.node.url.url,
    };

    return testData;
  });

  return nodes ?? [];
};
