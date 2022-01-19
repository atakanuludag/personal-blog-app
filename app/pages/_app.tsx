import React, { useState } from 'react'
import App from 'next/app'
import type { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { NextSeo } from 'next-seo'
import moment from 'moment'
import 'moment/locale/tr'
import Theme from '@/layouts/Theme'
import store from '@/store'
import SettingService from '@/services/SettingService'
import '../styles/global.scss'

import SSRCookie from '@/utils/SSRCookie'

const NextApp = ({ Component, pageProps }: AppProps) => {
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
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <NextSeo defaultTitle={''} />
        <Provider store={store}>
          <Theme>
            <Component {...pageProps} />
          </Theme>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  )
}

NextApp.getInitialProps = async (appContext: AppContext) => {
  const { req, res }: any = appContext.ctx
  const { setCookie } = SSRCookie(req, res)
  const service = new SettingService()
  const appProps = await App.getInitialProps(appContext)
  const settings = await service.getItems()
  await setCookie('settings', settings)
  appProps.pageProps.settings = settings
  return { ...appProps }
}

export default NextApp
