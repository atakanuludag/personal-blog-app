// ** react
import { useState } from 'react'

// ** next
import App from 'next/app'
import type { AppContext, AppProps } from 'next/app'
import Head from 'next/head'

// ** mui
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import tr from 'date-fns/locale/tr'

// ** third party
import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import parser from 'ua-parser-js'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
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
import { COOKIE_NAMES } from '@/core/Constants'

// ** utils
import Cookie from '@/utils/Cookie'
import createEmotionCache from '@/utils/CreateEmotionCache'

// ** services
import CategoryService from '@/services/CategoryService'
import PageService from '@/services/PageService'

// ** models
import { PaletteMode } from '@/models/enums'
import TokenModel from '@/models/TokenModel'
import PageModel from '@/models/PageModel'
import PageWithLayoutType from '@/models/PageWithLayoutType'
import AppPropsModel from '@/models/AppPropsModel'

// ** global styles
import '@/styles/global.scss'

// ** context
import SettingsProvider from '@/context/SettingsContext'
import ComponentProvider from '@/context/ComponentContext'

// ** components
import FormDrawer from '@/components/FormDrawer'
import ConfirmDialog from '@/components/ConfirmDialog'
import Popover from '@/components/Popover'

// ** config
import {
  APP_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  NAVBAR_PAGE_IDS,
} from '@/config'

type PersonalBlogAppProps = {
  Component: PageWithLayoutType<AppPropsModel>
  pageProps: AppPropsModel
  emotionCache: EmotionCache
} & AppProps

//https://nextjs.org/docs/messages/opt-out-auto-static-optimization
const clientSideEmotionCache = createEmotionCache()

const PersonalBlogApp = (props: PersonalBlogAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const Layout = Component.layout
    ? Component.layout || ((children: any) => children)
    : LayoutBlogPage
  const componentTitle = Component.title || null
  const auth: TokenModel | undefined = pageProps.auth
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
          defaultTitle={SITE_TITLE}
          titleTemplate={`%s | ${SITE_TITLE}`}
          title={SITE_TITLE}
          description={SITE_DESCRIPTION}
          canonical={APP_URL}
          openGraph={{
            type: 'website',
            locale: 'tr_TR',
            title: SITE_TITLE,
            url: APP_URL,
            site_name: SITE_TITLE,
          }}
        />
        <SettingsProvider initialThemeMode={pageProps.themeMode}>
          <ComponentProvider>
            <CacheProvider value={emotionCache}>
              <Theme deviceType={pageProps.deviceType}>
                <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
                  <Layout title={componentTitle} {...pageProps}>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={tr}
                    >
                      <Component {...pageProps} />{' '}
                    </LocalizationProvider>
                    <FormDrawer />
                    <ConfirmDialog />
                    <Popover />
                  </Layout>
                </SnackbarProvider>
              </Theme>
            </CacheProvider>
          </ComponentProvider>
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
  const deviceType = parser(req?.headers['user-agent']).device.type || 'desktop'

  let userIpAdress = '127.0.0.1'

  if (res) {
    userIpAdress = res.getHeader('IpAddress') as string
    if (process.env.NODE_ENV === 'development') userIpAdress = '127.0.0.1'
  }

  const categories = await CategoryService.getItems()

  const navbarPageIds = NAVBAR_PAGE_IDS?.split(',') || []
  const navbarPages = new Array<PageModel>()

  for await (const pageId of navbarPageIds) {
    const page = await PageService.getItemById(pageId)
    if (page) navbarPages.push(page)
  }

  const themeMode: PaletteMode = getCookie(COOKIE_NAMES.THEME_MODE)
  const auth: TokenModel | null = getCookie(COOKIE_NAMES.AUTH, true)
  if (auth) {
    //Todo: bakılacak.
    //Client side ve server side interceptor için ayrı ayrı setlememiz gerekiyor. Bence bu bir bug.
    //Server side'da token ile bir işlem yapmayacağım için burayı kapattım.
    //AxiosSetTokenInterceptor(auth.accessToken)
    appProps.pageProps.auth = auth
  }

  appProps.pageProps = {
    ...appProps.pageProps,
    categories,
    navbarPages,
    userIpAdress,
    deviceType,
    themeMode: themeMode || PaletteMode.DARK,
  }
  return { ...appProps }
}

export default PersonalBlogApp
