const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
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
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5051",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.atakanuludag.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "atakanuludag.com",
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

module.exports = nextConfig;
