"use client";

import { Components, Theme } from "@mui/material/styles";

export default function Button(
  theme: Theme
): Components<Omit<Theme, "components">> {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          color: theme.palette.secondary.main,
        },
      },
    },
  };
}
