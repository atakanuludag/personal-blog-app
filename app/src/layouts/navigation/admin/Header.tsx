"use client";

// ** react
import { Fragment, useState } from "react";

// ** next
import { useRouter } from "next/navigation";

// ** mui
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// ** icons
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";

// ** components
import DarkModeToggle from "@/components/DarkModeToggle";

// ** services
import NextService from "@/services/NextService";

// ** hooks
import useSettingsContext from "@/hooks/useSettingsContext";

// ** config
import { THEME_SETTINGS } from "@/config";
import { useMutation } from "@tanstack/react-query";

const StyledMenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const AppBarDesktop = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: THEME_SETTINGS.DRAWER_WITDH,
    width: `calc(100% - ${THEME_SETTINGS.DRAWER_WITDH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type AdminNavigationHeaderProps = {
  matchDownMD: boolean;
};

const HeaderContent = () => {
  const router = useRouter();
  const { handleChangeAdminNavigationTrigger } = useSettingsContext();

  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const userMenuOpen = Boolean(userMenuAnchorEl);

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: NextService.logout,
    onSuccess: () => {
      router.push("/admin/login");
      handleUserMenuClose();
    },
    onError: () => {
      handleUserMenuClose();
    },
  });

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setUserMenuAnchorEl(event.currentTarget);

  const handleUserMenuClose = () => setUserMenuAnchorEl(null);

  return (
    <Toolbar>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <StyledMenuButton
          color="inherit"
          edge="start"
          onClick={handleChangeAdminNavigationTrigger}
        >
          <MenuIcon />
        </StyledMenuButton>

        <Stack display="flex" direction="row" spacing={1}>
          <DarkModeToggle isAdminAppBar />

          <Tooltip title="Ana sayfaya git">
            <IconButton>
              <HomeIcon />
            </IconButton>
          </Tooltip>

          <IconButton onClick={handleUserMenuClick}>
            <PersonIcon />
          </IconButton>
        </Stack>
      </Box>

      <Menu
        anchorEl={userMenuAnchorEl}
        open={userMenuOpen}
        onClose={handleUserMenuClose}
        MenuListProps={{
          style: {
            minWidth: "200px",
          },
        }}
      >
        <MenuItem onClick={() => logout()} disabled={isLoading}>
          {isLoading ? "Bekleyiniz..." : "Çıkış Yap"}
        </MenuItem>
      </Menu>
    </Toolbar>
  );
};

export default function AdminNavigationHeader({
  matchDownMD,
}: AdminNavigationHeaderProps) {
  const { adminNavigationOpen } = useSettingsContext();
  return (
    <Fragment>
      {!matchDownMD ? (
        <AppBarDesktop position="fixed" open={adminNavigationOpen}>
          <HeaderContent />
        </AppBarDesktop>
      ) : (
        <AppBar>
          <HeaderContent />
        </AppBar>
      )}
    </Fragment>
  );
}
