"use client";

import { Components, Theme } from "@mui/material/styles";

export default function ListItemButton(
  theme: Theme
): Components<Omit<Theme, "components">> {
  return {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[700]
                : theme.palette.grey[300],
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[800]
                  : theme.palette.grey[400],
            },
          },
        },
      },
    },
  };
}
