"use client";

import { Components, Theme } from "@mui/material/styles";

export default function ToggleButton(
  theme: Theme
): Components<Omit<Theme, "components">> {
  const isDark = theme.palette.mode === "dark";
  return {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            border: `2px solid ${
              isDark ? theme.palette.common.white : theme.palette.common.black
            }`,
          },
        },
      },
    },
  };
}
