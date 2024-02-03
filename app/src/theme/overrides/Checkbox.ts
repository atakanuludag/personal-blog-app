"use client";

import { Components, Theme } from "@mui/material/styles";

export default function Checkbox(
  theme: Theme
): Components<Omit<Theme, "components">> {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color:
              theme.palette.mode === "dark"
                ? theme.palette.common.white
                : theme.palette.common.black,
          },
        },
      },
    },
  };
}
