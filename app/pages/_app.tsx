import React, { useState } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { NextSeo } from 'next-seo'
import Theme from '@/theme'
import moment from 'moment'
import 'moment/locale/tr'
import '../styles/global.scss'

moment.locale('tr')

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <NextSeo defaultTitle={''} />
      <Theme>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </Theme>
    </>
  )
}
