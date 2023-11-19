"use client";

// ** react
import { Fragment, useState, KeyboardEvent, MouseEvent } from "react";

// ** mui
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

// ** layouts
import Content from "@/layouts/navigation/blog/Content";
import MobileHeader from "@/layouts/navigation/blog/MobileHeader";

// ** models
import CategoryModel from "@/models/CategoryModel";
import PageModel from "@/models/PageModel";

// ** config
import { SITE_TITLE, THEME_SETTINGS } from "@/config";

type NavigationProps = {
  categories: CategoryModel[];
  navbarPages: PageModel[];
};

export function MobileNavigation(props: NavigationProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = (e: KeyboardEvent | MouseEvent) => {
    const key = (e as KeyboardEvent).key;
    if (e.type === "keydown" && (key === "Tab" || key === "Shift")) return;
    setOpen(!open);
  };

  return (
    <Box
      sx={(theme) => ({
        display: "none",
        [theme.breakpoints.down("md")]: {
          display: "block",
        },
      })}
    >
      <MobileHeader
        handleToggle={handleToggle}
        personDisplayName={SITE_TITLE || ""}
      />
      <Drawer
        sx={{ flexShrink: 0, width: THEME_SETTINGS.DRAWER_WITDH }}
        variant="temporary"
        PaperProps={{
          style: {
            width: THEME_SETTINGS.DRAWER_WITDH,
          },
        }}
        anchor="left"
        open={open}
        onClose={handleToggle}
      >
        <Content {...props} />
      </Drawer>
    </Box>
  );
}

export function DesktopNavigation(props: NavigationProps) {
  return (
    <Box
      sx={(theme) => ({
        display: "block",
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
      })}
    >
      <Drawer
        open
        sx={{ flexShrink: 0, width: THEME_SETTINGS.DRAWER_WITDH }}
        variant="permanent"
        PaperProps={{
          style: {
            width: THEME_SETTINGS.DRAWER_WITDH,
            // backgroundColor: "grey.800",
          },
        }}
        anchor="left"
      >
        <Content {...props} />
      </Drawer>
    </Box>
  );
}

export default function Navigation(props: NavigationProps) {
  return (
    <Fragment>
      <DesktopNavigation {...props} />
      <MobileNavigation {...props} />
    </Fragment>
  );
}
