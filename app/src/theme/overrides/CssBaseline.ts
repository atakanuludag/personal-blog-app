"use client";

import { Components, Theme } from "@mui/material/styles";
import darkScrollbar from "@mui/material/darkScrollbar";

export default function CssBaseline(
  theme: Theme
): Components<Omit<Theme, "components">> {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...(theme.palette.mode === "dark" ? darkScrollbar() : null),
          transition: "all 0.3s linear",
        },
        // body: {
        //   backgroundColor: `${
        //     theme.palette.mode === "dark"
        //       ? theme.palette.common.black
        //       : theme.palette.common.white
        //   } !important`,
        // },
        //body: theme.palette.mode === "dark" ? darkScrollbar() : null,
        ".editor-heading-h1": {
          fontSize: "24px",
          color:
            theme.palette.mode === "dark"
              ? theme.palette.common.white
              : theme.palette.common.black,
        },
        ".editor-heading-h2": {
          fontSize: "15px",
          color:
            theme.palette.mode === "dark"
              ? theme.palette.common.white
              : theme.palette.common.black,
          fontWeight: 700,
          margin: 0,
          marginTop: "10px",
          padding: 0,
          textTransform: "uppercase",
        },
        ".editor-code": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[900]
              : theme.palette.grey[100],
          fontFamily: "Menlo, Consolas, Monaco, monospace",
          display: "block",
          padding: "8px 8px 8px 52px",
          lineHeight: 1.53,
          fontSize: "13px",
          margin: 0,
          marginTop: "8px",
          marginBottom: "8px",
          tabSize: 2,
          overflowX: "auto",
          position: "relative",
          "&:before": {
            content: "attr(data-gutter)",
            position: "absolute",
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[800]
                : theme.palette.grey[200],
            left: 0,
            top: 0,
            borderRight: "1px solid",
            borderRightColor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[700]
                : theme.palette.grey[300],
            padding: "8px",
            color:
              theme.palette.mode === "dark"
                ? theme.palette.common.white
                : theme.palette.common.black,
            whiteSpace: "pre-wrap",
            textAlign: "right",
            minWidth: "25px",
          },
          "&:after": {
            content: "attr(data-highlight-language)",
            top: 0,
            right: "3px",
            padding: "3px",
            fontSize: "10px",
            textTransform: "uppercase",
            position: "absolute",
            color:
              theme.palette.mode === "dark"
                ? theme.palette.grey[300]
                : theme.palette.grey[700],
          },
        },
        ".editor-quote": {
          margin: "0",
          marginLeft: "20px",
          fontSize: "15px",
          color: "rgb(101, 103, 107)",
          borderLeftColor: "rgb(206, 208, 212)",
          borderLeftWidth: "4px",
          borderLeftStyle: "solid",
          paddingLeft: "16px",
        },
        ".editor-list-ol": { padding: "0", margin: "0", marginLeft: "16px" },
        ".editor-list-ul": { padding: "0", margin: "0", marginLeft: "16px" },
        ".editor-listitem": { margin: "8px 32px 8px 32px" },
        ".editor-nested-listitem": { listStyleType: "none" },
      },
    },
  };
}
