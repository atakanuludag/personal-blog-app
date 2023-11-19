"use client";

// ** react
import { Fragment } from "react";

// ** next
import { default as NextLink } from "next/link";

// ** mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

// ** icons
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

// ** components
import SearchInput from "@/components/SearchInput";

// ** models
import CategoryModel from "@/models/CategoryModel";
import PageModel from "@/models/PageModel";

// ** config
import {
  SITE_TITLE,
  PERSONAL_DESCRIPTION,
  TWITTER_URL,
  INSTAGRAM_URL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/config";

// const StyledDivider = styled(Divider)(({ theme }) => ({
//   fontSize: "1.5rem",
//   fontWeight: "bold",
//   textAlign: "center",
//   padding: 0,
//   "& a": {
//     display: "block",
//     width: "100%",
//     color: theme.palette.primary.contrastText,
//     textDecoration: "none",
//   },
// }));

const Title = styled("h1")(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
  padding: 0,
  "& a": {
    display: "block",
    width: "100%",
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
  },
}));

const Padding = styled("div")(({ theme }) => ({
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
}));

const StyledNav = styled("nav")(() => ({
  "& p": {
    textAlign: "center",
  },
}));

const ProfileSection = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingLeft: 5,
  paddingRight: 5,
  "&>*": {
    paddingBottom: "20px",
  },
}));

const Avatar = styled("img")(() => ({
  width: "70%",
  borderRadius: "100%",
}));

const SocialMedia = styled("ul")(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  margin: 0,
  padding: 0,
  "& li": {
    listStyle: "none",
  },
}));

const CategoriesWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
}));

type NavigationContentProps = {
  categories: CategoryModel[];
  navbarPages: PageModel[];
};

export default function NavigationContent({
  categories,
  navbarPages,
}: NavigationContentProps) {
  return (
    <StyledNav>
      <ProfileSection>
        <Title>
          <Link component={NextLink} href="/">
            {SITE_TITLE}
          </Link>
        </Title>

        <Avatar src="/avatar.jpg" alt={SITE_TITLE} />
        <Typography variant="caption" component="p">
          {PERSONAL_DESCRIPTION}
        </Typography>

        <SocialMedia>
          <li>
            <Link href={TWITTER_URL}>
              <Tooltip title="Twitter">
                <TwitterIcon color="action" />
              </Tooltip>
            </Link>
          </li>
          <li>
            <Link href={INSTAGRAM_URL}>
              <Tooltip title="Instagram">
                <InstagramIcon color="action" />
              </Tooltip>
            </Link>
          </li>
          <li>
            <Link href={GITHUB_URL}>
              <Tooltip title="Github">
                <GitHubIcon color="action" />
              </Tooltip>
            </Link>
          </li>
          <li>
            <Link href={LINKEDIN_URL}>
              <Tooltip title="Linkedin">
                <LinkedInIcon color="action" />
              </Tooltip>
            </Link>
          </li>
        </SocialMedia>
      </ProfileSection>

      <Box padding={1} mb={2} mt={1}>
        <SearchInput size="small" fullWidth />
      </Box>

      <Divider />

      {navbarPages && (
        <Fragment>
          <List>
            {navbarPages.map((page) => (
              <ListItemButton
                key={page._id}
                LinkComponent={NextLink}
                href={`/${page.guid}`}
              >
                <ListItemText primary={page.title} />
              </ListItemButton>
            ))}
          </List>

          <Divider />
        </Fragment>
      )}
      {categories.length > 0 && (
        <CategoriesWrapper>
          <Padding>
            <Typography
              component="span"
              fontSize="16px"
              textTransform="uppercase"
              fontWeight="bold"
            >
              Kategoriler
            </Typography>
          </Padding>

          <List>
            {categories.map((category) => (
              <ListItemButton
                key={category._id}
                LinkComponent={NextLink}
                href={`/category/${category.guid}`}
              >
                <ListItemText primary={category.title} />
              </ListItemButton>
            ))}
          </List>
        </CategoriesWrapper>
      )}
    </StyledNav>
  );
}
