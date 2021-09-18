import React from 'react';
import type { AppProps } from 'next/app'
import '../styles/global.scss';
import { Header, Footer } from '@/components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Header />
      <div className="main-wrapper">
        <React.Fragment>
          <Component {...pageProps} />
          <Footer />
        </React.Fragment>
      </div>
    </React.Fragment>
  );
}
export default MyApp
