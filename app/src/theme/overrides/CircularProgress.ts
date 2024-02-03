"use client";

import { Components, Theme } from "@mui/material/styles";

export default function CircularProgress(
  theme: Theme
): Components<Omit<Theme, "components">> {
  return {
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: `${
            theme.palette.mode === "dark"
              ? theme.palette.common.white
              : theme.palette.common.black
          } !important`,
        },
      },
    },
  };
}
