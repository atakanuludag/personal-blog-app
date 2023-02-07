// ** react
import { useState } from 'react'

// ** next
import App from 'next/app'
import type { AppContext, AppProps } from 'next/app'
import Head from 'next/head'

// ** third party
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { NextSeo } from 'next-seo'
import { SnackbarProvider } from 'notistack'
import moment from 'moment'
import 'moment/locale/tr'

// ** mui theme
import Theme from '@/theme'

// ** layouts
import LayoutBlogPage from '@/layouts/LayoutBlogPage'

// ** core
import { axiosSetTokenInterceptor } from '@/core/Axios'

// ** utils
import GlobalStore from '@/utils/GlobalStore'
import Cookie from '@/utils/Cookie'

// ** services
import SettingService from '@/services/SettingService'

// ** models
import ISettings from '@/models/ISettings'
import IToken from '@/models/IToken'
import PageWithLayoutType from '@/models/PageWithLayoutType'

// ** global styles
import '@/styles/global.scss'

// ** context
import SettingsProvider from '@/context/SettingsContext'

// ** components
import ErrorBoundary from '@/components/ErrorBoundary'
interface PersonalBlogPageProps {
  dehydratedState: DehydratedState
  settings: ISettings
  userIpAdress: string
  auth?: IToken
}
interface PersonalBlogAppProps extends AppProps {
  Component: PageWithLayoutType<PersonalBlogPageProps>
  pageProps: PersonalBlogPageProps
}

const PersonalBlogApp = ({ Component, pageProps }: PersonalBlogAppProps) => {
  const Layout = Component.layout
    ? Component.layout || ((children: any) => children)
    : LayoutBlogPage

  // const Layout = Component.layout
  //   ? Component.layout || ((page: any) => page)
  //   : LayoutBlogPage

  const settings: ISettings = pageProps.settings
  const auth: IToken | undefined = pageProps.auth
  if (auth) axiosSetTokenInterceptor(auth.accessToken)

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
        <SettingsProvider>
          <Theme>
            <ErrorBoundary>
              <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
                <Layout {...pageProps}>
                  <Component {...pageProps} />
                </Layout>
              </SnackbarProvider>
            </ErrorBoundary>
          </Theme>
        </SettingsProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  )
}

PersonalBlogApp.getInitialProps = async (appContext: AppContext) => {
  const { req, res } = appContext.ctx
  const { getCookie } = Cookie(req, res)
  const appProps = await App.getInitialProps(appContext)
  let userIpAdress = '127.0.0.1'

  if (res) {
    userIpAdress = res.getHeader('IpAddress') as string
    if (process.env.NODE_ENV === 'development') userIpAdress = '127.0.0.1'
  }

  const settings = await SettingService.getItemsAsObject()
  const auth: IToken | null = getCookie('auth', true)
  if (auth) {
    //Client side ve server side interceptor için ayrı ayrı setlememiz gerekiyor. Bence bu bir bug.
    //Server side'da token ile bir işlem yapmayacağım için burayı kapattım.
    //AxiosSetTokenInterceptor(auth.accessToken)
    appProps.pageProps.auth = auth
  }

  GlobalStore.set('settings', settings) //use SSR and use getServerSideProps
  GlobalStore.set('userIpAdress', userIpAdress) //use SSR and use getServerSideProps

  appProps.pageProps.settings = settings
  appProps.pageProps.userIpAdress = userIpAdress
  return { ...appProps }
}

export default PersonalBlogApp
