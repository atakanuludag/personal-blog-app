// ** react
import { ReactNode } from "react";

// ** next
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Noto_Sans } from "next/font/google";

// ** third party
import setDefaultOptions from "date-fns/setDefaultOptions";
import dateFnsLocaleTR from "date-fns/locale/tr";

// ** mui
import Box from "@mui/material/Box";

// ** theme
import Registry from "@/theme/Registry";

// ** models
import { PaletteMode } from "@/models/enums";

// ** config
import {
  REVALIDATE_SECONDS,
  APP_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  COOKIE_NAMES,
} from "@/config";

// ** global styles
import "@/styles/global.scss";

setDefaultOptions({ locale: dateFnsLocaleTR });

const inter = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_TITLE}`,
    default: SITE_TITLE as string,
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  authors: {
    name: SITE_TITLE,
    url: APP_URL,
  },
  metadataBase: new URL(APP_URL as string),
  alternates: {
    canonical: new URL(APP_URL as string),
    languages: {
      tr: "/",
    },
  },
  icons: {
    shortcut: ["/favicon/favicon-16x16.png"],
    icon: [
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  openGraph: {
    images: "/avatar.jpg",
  },
};

export default async function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = cookies();
  const cookieGetTheme = cookieStore.get(COOKIE_NAMES.THEME);
  const cookieGetAdminNavigation = cookieStore.get(
    COOKIE_NAMES.ADMIN_NAVIGATION
  );

  const themeMode = !cookieGetTheme
    ? PaletteMode.DARK
    : (cookieGetTheme.value as PaletteMode);

  const adminNavigationOpen = cookieGetAdminNavigation?.value
    ? cookieGetAdminNavigation?.value === "true"
      ? true
      : false
    : true;

  return (
    <html lang="tr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <Registry
          themeMode={themeMode}
          adminNavigationOpen={adminNavigationOpen}
        >
          <Box
            display="flex"
            flexDirection={{
              md: "row",
              xs: "column",
            }}
          >
            {children}
          </Box>
        </Registry>
      </body>
    </html>
  );
}

export const revalidate = REVALIDATE_SECONDS;
