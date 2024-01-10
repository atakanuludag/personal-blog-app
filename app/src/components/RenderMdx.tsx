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
    code({ node, inline, className, children, ...props }: any) {
      //todo: any
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          language={match[1]}
          style={theme === PaletteMode.DARK ? materialDark : materialLight}
          showLineNumbers
          {...props}
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
