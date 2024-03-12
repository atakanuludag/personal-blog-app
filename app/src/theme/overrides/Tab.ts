"use client";

import { Components, Theme } from "@mui/material/styles";

export default function Tab(
  theme: Theme
): Components<Omit<Theme, "components">> {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[600],
          "&.Mui-selected": {
            color: theme.palette.grey[100],
          },
        },
      },
    },
  };
}
