import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets} from '@mui/styles';

export default class AppDocument extends Document {
    render() {
      return (
        <Html lang="tr">
          <Head>
            { /*<meta name="theme-color" content={theme.palette.primary.main} /> */}
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
      );
    }
  }
  
  // `getInitialProps` belongs to `_document` (instead of `_app`),
  // it's compatible with server-side generation (SSG).
  AppDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render
  
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
  
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });
  
    const initialProps = await Document.getInitialProps(ctx);
  
    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};