import React from 'react';
import type { AppProps } from 'next/app';
import { Layout } from '../layouts/Layout';
import '../styles/app.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const App: React.FunctionComponent<AppProps> = props => {
  return (
    <>
      <Layout>
        <props.Component {...props.pageProps} />
      </Layout>
    </>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App;
