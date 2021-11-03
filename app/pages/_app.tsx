import React from 'react';
import type { AppProps } from 'next/app'
import '../styles/global.scss';
import { Header, Footer } from '@/components';
import moment from 'moment';
import 'moment/locale/tr';

moment.locale("tr");

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
