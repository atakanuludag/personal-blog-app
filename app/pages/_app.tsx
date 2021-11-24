import React from 'react';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import Theme from '@/components/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import moment from 'moment';
import 'moment/locale/tr';
import '../styles/global.scss';

moment.locale("tr");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <NextSeo
        defaultTitle={""}
      />
      <Theme><Component {...pageProps} /></Theme>
    </>
  );
}
