import React from 'react';
import Head from 'next/head';

export interface PageProps {
  title: string;
  description: string;
}

export const Page: React.FunctionComponent<PageProps> = props => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      {props.children}
    </>
  );
};
