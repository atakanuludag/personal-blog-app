import React, { useState } from 'react'
import App from 'next/app'
import type { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { NextSeo } from 'next-seo'
import { SnackbarProvider } from 'notistack'
import moment from 'moment'
import 'moment/locale/tr'
import store from '@/store'
import Theme from '@/layouts/Theme'
import { AxiosSetTokenInterceptor } from '@/core/Axios'
import GlobalStore from '@/utils/GlobalStore'
import Cookie from '@/utils/Cookie'
import SettingService from '@/services/SettingService'
import ISettings from '@/models/ISettings'
import PageWithLayoutType from '@/models/PageWithLayoutType'
import LayoutBlogPage from '@/layouts/LayoutBlogPage'

import '../styles/global.scss'

import IToken from '@/models/IToken'
import { getLocalStorage } from '@/utils/LocalStorage'
import { LOCAL_STORAGES } from '@/core/Constants'

interface PersonalBlogAppProps extends AppProps {
  Component: PageWithLayoutType
  pageProps: any
}

const PersonalBlogApp = ({ Component, pageProps }: PersonalBlogAppProps) => {
  const Layout = Component.layout
    ? Component.layout || ((children) => <>{children}</>)
    : LayoutBlogPage

  const settings: ISettings = pageProps.settings

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
        <NextSeo
          defaultTitle={settings.siteTitle}
          titleTemplate={`%s | ${settings.siteTitle}`}
          title={settings.siteTitle}
          description={settings.siteDescription}
          canonical={settings.siteUrl}
          openGraph={{
            type: 'website',
            locale: 'tr_TR',
            title: settings.siteTitle,
            url: settings.siteUrl,
            site_name: settings.siteTitle,
          }}
        />
        <Provider store={store}>
          <Theme settings={settings}>
            <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SnackbarProvider>
          </Theme>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  )
}

PersonalBlogApp.getInitialProps = async (appContext: AppContext) => {
  const { req, res } = appContext.ctx
  const { getCookie } = Cookie(req, res)
  const service = new SettingService()
  const appProps = await App.getInitialProps(appContext)
  const settings = await service.getItems()
  //buralarda auth datası varsa axiosa setleyeceğiz.
  //import { AxiosSetTokenInterceptor } from '@/core/Axios'

  const auth: IToken | null = getCookie('auth', true)
  if (auth) AxiosSetTokenInterceptor(auth.accessToken)

  GlobalStore.set('settings', settings) //use SSR (getServerSideProps)
  // if (auth) {
  //   GlobalStore.set('auth', auth) //use SSR (getServerSideProps)
  //   AxiosSetTokenInterceptor(auth.accessToken)
  // }
  appProps.pageProps.settings = settings
  return { ...appProps }
}

export default PersonalBlogApp
