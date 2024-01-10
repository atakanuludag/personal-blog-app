// const createMDX = require("@next/mdx")();
// const remarkGfm = require("remark-gfm")();
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  swcMinify: true,
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  //pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "atakanuludag.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "api.atakanuludag.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.atakanuludag.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

// const withMDX = createMDX({
//   // Add markdown plugins here, as desired
//   options: {
//     remarkPlugins: [remarkGfm],
//     rehypePlugins: [],
//   },
// });

module.exports = nextConfig;
