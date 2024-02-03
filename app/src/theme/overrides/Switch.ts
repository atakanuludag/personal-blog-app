"use client";

import { Components, Theme } from "@mui/material/styles";

export default function Switch(
  theme: Theme
): Components<Omit<Theme, "components">> {
  return {
    MuiSwitch: {
      styleOverrides: {
        root: {
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: theme.palette.grey[800],
          },
          "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
            backgroundColor: theme.palette.grey[400],
          },
        },
      },
    },
  };
}
