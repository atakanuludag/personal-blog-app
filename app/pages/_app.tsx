import React, { useState } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { NextSeo } from 'next-seo'
import moment from 'moment'
import 'moment/locale/tr'
import Theme from '@/theme'
import store from '@/store'
import '../styles/global.scss'

export default function App({ Component, pageProps }: AppProps) {
  //Moment lang setting
  moment.locale('tr')

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      }),
  )

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          <NextSeo defaultTitle={''} />
          <Theme>
            <Component {...pageProps} />
          </Theme>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  )
}
