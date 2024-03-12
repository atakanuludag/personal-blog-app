"use client";

import { Components, Theme } from "@mui/material/styles";

export default function ButtonBase(
  theme: Theme
): Components<Omit<Theme, "components">> {
  return {
    MuiButtonBase: {
      styleOverrides: {
        root: {},
      },
    },
  };
}
