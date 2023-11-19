"use client";

import { Components, Theme } from "@mui/material";

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
