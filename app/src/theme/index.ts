"use client";

// ** react
import { useMemo } from "react";

// // ** third party
// import mediaQuery from "css-mediaquery";

// ** mui
import { createTheme } from "@mui/material/styles";
import { common, grey } from "@mui/material/colors";
import { trTR } from "@mui/material/locale";

// ** models
import { PaletteMode } from "@/models/enums";

// ** overrides
import componentsOverride from "@/theme/overrides";

const Theme = (deviceType: string, mode: PaletteMode) => {
  const darkColor = "#202020";

  // const ssrMatchMedia = (query: string) => ({
  //   matches: mediaQuery.match(query, {
  //     // The estimated CSS width of the browser.
  //     width: deviceType === "mobile" ? "0px" : "1024px",
  //   }),
  // });

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode,
            ...(mode === PaletteMode.LIGHT
              ? {
                  primary: {
                    main: grey[50],
                    contrastText: grey[900],
                  },
                  secondary: {
                    main: grey[900],
                    contrastText: grey[600],
                  },
                  text: {
                    primary: grey[900],
                    secondary: grey[900],
                  },
                }
              : {
                  primary: {
                    main: darkColor,
                    contrastText: common.white,
                  },
                  secondary: {
                    main: common.white,
                    contrastText: grey[600],
                  },
                  text: {
                    primary: common.white,
                    secondary: common.white,
                  },
                }),
          },
        },
        trTR
      ),
    [mode, deviceType]
  );

  theme.components = {
    ...theme.components,
    ...componentsOverride(theme),
  };
  return theme;
};

export default Theme;
