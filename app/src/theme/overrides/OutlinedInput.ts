"use client";

import { Components, Theme } from "@mui/material/styles";

export default function OutlinedInput(
  theme: Theme
): Components<Omit<Theme, "components">> {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.grey[500],
            },
          },
        },
      },
    },
  };
}
