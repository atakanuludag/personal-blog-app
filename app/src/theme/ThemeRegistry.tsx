"use client";

// ** react
import { ReactNode } from "react";

// ** next
import { useServerInsertedHTML } from "next/navigation";

// ** third party
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// ** mui
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import tr from "date-fns/locale/tr";

// ** theme
import MuiTheme from "@/theme";

// ** hooks
import useSettingsContext from "@/hooks/useSettingsContext";

type ThemeRegistryProps = {
  children: ReactNode;
};

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  const { themeMode } = useSettingsContext();

  const cacheTrigger = () => {
    const cache = createCache({ key: `mui-${themeMode}` });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  };

  const { cache, flush } = cacheTrigger();

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={MuiTheme("desktop", themeMode)}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
