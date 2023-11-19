"use client";

// ** next
import { default as NextLink } from "next/link";

// ** mui
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// ** icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ArticleIcon from "@mui/icons-material/Article";
import CategoryIcon from "@mui/icons-material/Category";
import TagIcon from "@mui/icons-material/Tag";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import useRouterActive from "@/hooks/useRouterActive";

// ** config
import { APP_VERSION } from "@/config";

type ListItemMenuProps = {
  readonly title: string;
  readonly path: string;
  readonly icon: JSX.Element;
  readonly onClick?: () => void;
};

const adminMenu: ListItemMenuProps[] = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon />,
  },
  {
    title: "Sayfalar",
    path: "/admin/pages",
    icon: <AutoStoriesIcon />,
  },
  {
    title: "Makaleler",
    path: "/admin/articles",
    icon: <ArticleIcon />,
  },
  {
    title: "Kategoriler",
    path: "/admin/categories",
    icon: <CategoryIcon />,
  },
  {
    title: "Etiketler",
    path: "/admin/tags",
    icon: <TagIcon />,
  },
  {
    title: "Ortam",
    path: "/admin/files",
    icon: <PermMediaIcon />,
  },
];

export default function AdminNavigationContent() {
  const routerActive = useRouterActive();

  return (
    <Box>
      <AppBar position="static" sx={{ height: 64 }} color="primary">
        <Stack
          display="flex"
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Typography fontSize={22}>Admin Panel</Typography>
          <Chip
            clickable
            label={`v${APP_VERSION}`}
            component={NextLink}
            sx={{
              borderRadius: 1.5,
              //width: 44,
              height: 20,
              fontSize: 12,
              "& .MuiChip-label": {
                paddingLeft: "4px",
                paddingRight: "4px",
              },
            }}
            href={"https://github.com/atakanuludag/personal-blog-app"}
          />
        </Stack>
      </AppBar>
      <List sx={{ padding: 0 }}>
        {adminMenu.map((m, i) =>
          !m.onClick ? (
            <ListItemButton
              key={i}
              component={NextLink}
              href={m.path}
              selected={routerActive(m.path)}
            >
              <ListItemIcon>{m.icon}</ListItemIcon>
              <ListItemText primary={m.title} />
            </ListItemButton>
          ) : (
            <ListItemButton key={i} onClick={m.onClick}>
              <ListItemIcon>{m.icon}</ListItemIcon>
              <ListItemText primary={m.title} />
            </ListItemButton>
          )
        )}
      </List>
    </Box>
  );
}
