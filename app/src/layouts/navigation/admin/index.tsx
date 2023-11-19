"use client";

// ** react
import { Fragment } from "react";

// ** mui
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";

// ** layouts
import Content from "@/layouts/navigation/admin/Content";

// ** config
import { THEME_SETTINGS } from "@/config";
import useSettingsContext from "@/hooks/useSettingsContext";

const openedMixin = (theme: any) => ({
  width: THEME_SETTINGS.DRAWER_WITDH,
  borderRight: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  boxShadow: "none",
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 0,
  borderRight: "none",
  // boxShadow: theme.customShadows.z1,
});

const DrawerDesktop = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: any) => ({
  width: THEME_SETTINGS.DRAWER_WITDH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type AdminNavigationProps = {
  matchDownMD: boolean;
};

export default function AdminNavigation({ matchDownMD }: AdminNavigationProps) {
  const { handleChangeAdminNavigationTrigger, adminNavigationOpen } =
    useSettingsContext();

  return (
    <Fragment>
      {!matchDownMD ? (
        <DrawerDesktop
          open={adminNavigationOpen}
          variant="permanent"
          anchor="left"
        >
          <Content />
        </DrawerDesktop>
      ) : (
        <Drawer
          variant="temporary"
          open={adminNavigationOpen}
          onClose={handleChangeAdminNavigationTrigger}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: THEME_SETTINGS.DRAWER_WITDH,
              backgroundImage: "none",
              boxShadow: "inherit",
            },
          }}
        >
          <Content />
        </Drawer>
      )}
    </Fragment>
  );
}
