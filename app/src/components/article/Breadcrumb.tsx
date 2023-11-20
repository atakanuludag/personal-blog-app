// ** next
import { default as NextLink } from "next/link";

// ** mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

export type BreadcrumbDataProps = {
  title: string;
  link: string | null;
};

type BreadcrumbProps = {
  isShowHome?: boolean;
  data: BreadcrumbDataProps[];
};

export default function Breadcrumb({
  data,
  isShowHome = true,
  ...props
}: BreadcrumbProps) {
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      paddingBottom={2}
      {...props}
    >
      <Breadcrumbs aria-label="breadcrumb" separator="›" color="grey.700">
        {isShowHome && (
          <Link href="/" component={NextLink} underline="hover" color="inherit">
            Ana Sayfa
          </Link>
        )}

        {data.map((breadcrumb, i) => {
          if (breadcrumb.link) {
            return (
              <Link
                key={i}
                component={NextLink}
                href={breadcrumb.link}
                underline="hover"
                color="inherit"
              >
                {breadcrumb.title}
              </Link>
            );
          } else {
            return <Typography key={i}>{breadcrumb.title}</Typography>;
          }
        })}
      </Breadcrumbs>
    </Box>
  );
}
