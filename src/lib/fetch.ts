import {
  PrismicClient,
  GRAPHQL_API_URL,
  API_LOCALE,
  API_TOKEN
} from './prismic';

export interface DataFetchOptions {
  previewData?: {
    ref?: string;
  };
  variables?: unknown;
}

export const fetchData = async <T>(query: string, options: DataFetchOptions = {}): Promise<T> => {
  const prismicAPI = await PrismicClient.getApi();
  const res = await fetch(
    `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(options.variables)}`,
    {
      headers: {
        'Prismic-Ref': options.previewData?.ref ?? prismicAPI.masterRef.ref,
        'Content-Type': 'application/json',
        'Accept-Language': API_LOCALE,
        Authorization: `Token ${API_TOKEN}`,
      },
    }
  );

  if (res.status !== 200) {
    console.log(await res.text());
    throw new Error('Failed to fetch API');
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
};
