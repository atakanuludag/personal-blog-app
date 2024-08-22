// ** third party
import { MDXRemote } from "next-mdx-remote/rsc";

import { MDXComponents } from "mdx/types";
import remarkGfm from "remark-gfm";

// ** mui
import Link from "@mui/material/Link";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import StyledTableCell from "./markdown/styled/StyledTableCell";
import StyledTableRow from "./markdown/styled/StyledTableRow";
import Image, { ImageProps } from "next/image";
import MarkdownSyntaxHighlighter from "./markdown/SyntaxHighlighter";

type RenderMdxProps = {
  content: string;
};

export default function RenderMdx({ content }: RenderMdxProps) {
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
    table({ className, children }) {
      return (
        <TableContainer component={Paper}>
          <Table size="small">{children}</Table>
        </TableContainer>
      );
    },
    thead({ className, children }) {
      return <TableHead>{children}</TableHead>;
    },
    tr({ className, children }) {
      return <StyledTableRow>{children}</StyledTableRow>;
    },
    th({ className, children }) {
      return <StyledTableCell>{children}</StyledTableCell>;
    },
    td({ className, children }) {
      return <StyledTableCell>{children}</StyledTableCell>;
    },
    //https://yet-another-react-lightbox.com/examples/nextjs
    // img({ className, children, alt, src, ...props }) {
    //   console.log("props", props);
    //   if (!src) return <></>;
    //   return (
    //     <Image
    //       alt={alt ?? ""}
    //       src={src}
    //       width={500}
    //       height={500}
    //       style={{ height: "auto" }}
    //     />
    //   );
    // },
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <MarkdownSyntaxHighlighter codeLanguage={match[1]}>
          {children}
        </MarkdownSyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div>
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
          scope: {},
        }}
        components={components}
      />
    </div>
  );
}
