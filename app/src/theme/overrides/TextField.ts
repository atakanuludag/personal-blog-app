"use client";

import { Components, Theme } from "@mui/material/styles";

export default function TextField(
  theme: Theme
): Components<Omit<Theme, "components">> {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {},
      },
    },
  };
}
