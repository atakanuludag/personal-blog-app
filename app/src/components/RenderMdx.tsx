// ** third party
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "mdx/types";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

// ** models
import { PaletteMode } from "@/models/enums";

// ** mui
import Link from "@mui/material/Link";

type RenderMdxProps = {
  content: string;
  theme: PaletteMode;
};
export default function RenderMdx({ content, theme }: RenderMdxProps) {
  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  };

  const components: MDXComponents = {
    a({ className, children, ...props }) {
      return (
        <Link
          href={props.href}
          target={props.target}
          className={className}
          color="GrayText"
          underline="hover"
        >
          {children}
        </Link>
      );
    },
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <SyntaxHighlighter
          wrapLines
          showLineNumbers
          lineProps={{
            style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
          }}
          language={match[1]}
          style={theme === PaletteMode.DARK ? materialDark : materialLight}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div>
      <MDXRemote source={content} options={options} components={components} />
    </div>
  );
}
