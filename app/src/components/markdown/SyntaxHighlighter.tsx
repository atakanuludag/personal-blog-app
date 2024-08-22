"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SyntaxHighlighter from "react-syntax-highlighter";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTheme } from "@mui/material/styles";
import { PaletteMode } from "@/models/enums";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ReactNode } from "react";
import Tooltip from "@mui/material/Tooltip";

type MarkdownSyntaxHighlighterProps = {
  children: ReactNode;
  codeLanguage: string;
};

export default function MarkdownSyntaxHighlighter({
  children,
  codeLanguage,
}: MarkdownSyntaxHighlighterProps) {
  const theme = useTheme();
  const code = String(children).replace(/\n$/, "");
  return (
    <Box component="div" position="relative" width="100%">
      <Tooltip title="Kopyala">
        <IconButton
          size="small"
          sx={{ position: "absolute", right: 5, top: 5, zIndex: 9 }}
          onClick={async () => navigator.clipboard.writeText(code)}
        >
          <ContentCopyIcon sx={{ fontSize: 15 }} />
        </IconButton>
      </Tooltip>
      <SyntaxHighlighter
        wrapLines
        showLineNumbers
        lineProps={{
          style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
        }}
        language={codeLanguage}
        style={
          theme.palette.mode === PaletteMode.DARK ? atomOneDark : atomOneLight
        }
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  );
}
