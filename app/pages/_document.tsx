// ** react
import { Children } from 'react'

// ** next
import Document, { Html, Head, Main, NextScript } from 'next/document'

// ** emotion
import createEmotionServer from '@emotion/server/create-instance'
import { EmotionCache } from '@emotion/cache'

// ** utils
import createEmotionCache from '@/utils/CreateEmotionCache'
import { AppType } from 'next/app'

export default class AppDocument extends Document {
  render() {
    return (
      <Html lang="tr">
        <Head>
          <meta charSet="utf-8" />
          {/*<meta name="theme-color" content={theme.palette.primary.main} /> */}
          <link rel="profile" href="https://gmpg.org/xfn/11" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" href="/favicon-192x192.png" sizes="192x192" />
          <link rel="icon" href="/favicon-300x300.png" sizes="300x300" />
          <link rel="apple-touch-icon" href="/favicon-300x300.png" />
          <meta name="msapplication-TileImage" content="/favicon-300x300.png" />

          {/*
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${VARIABLES.GOOGLE_ANALYTICS_CODE}`}></script>
  
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${VARIABLES.GOOGLE_ANALYTICS_CODE}');
                `
              }}
            /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
AppDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage

  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  /* eslint-disable */
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp:
        (App: AppType | React.ComponentType<{ emotionCache: EmotionCache }>) =>
        (props) =>
          <App emotionCache={cache} {...props} />,
    })
  /* eslint-enable */

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
  }
}
