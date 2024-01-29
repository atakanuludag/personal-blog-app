"use client";

// ** react
import { Fragment, useEffect, useState } from "react";

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
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

// ** icons
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import CachedIcon from "@mui/icons-material/Cached";

// ** third party
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";

// ** components
import DarkModeToggle from "@/components/DarkModeToggle";
import MyProfile from "@/components/admin/shared/MyProfile";

// ** services
import NextService from "@/services/NextService";

// ** hooks
import useSettingsContext from "@/hooks/useSettingsContext";
import useComponentContext from "@/hooks/useComponentContext";
import useUserQuery from "@/hooks/queries/useUserQuery";
import useFetchErrorSnackbar from "@/hooks/useFetchErrorSnackbar";

// ** models
import CacheBodyModel from "@/models/CacheBodyModel";

// ** utils
import FetchError from "@/utils/fetchError";

// ** config
import { COOKIE_NAMES, THEME_SETTINGS } from "@/config";

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
  const token = Cookies.get(COOKIE_NAMES.TOKEN) as string;

  const router = useRouter();
  const { handleChangeAdminNavigationTrigger } = useSettingsContext();
  const fetchErrorSnackbar = useFetchErrorSnackbar();
  const { enqueueSnackbar } = useSnackbar();
  const { setFormDrawerData } = useComponentContext();
  const { useUserProfileQuery } = useUserQuery();
  const userProfile = useUserProfileQuery(token);

  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [cacheMenuAnchorEl, setCacheMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [displayName, setDisplayName] = useState<null | string>(null);

  const userMenuOpen = Boolean(userMenuAnchorEl);
  const cacheMenuOpen = Boolean(cacheMenuAnchorEl);

  const { mutate: cacheClear, isPending: isCacheClearLoading } = useMutation({
    mutationFn: (data: CacheBodyModel[]) => {
      const promises = data.map((item) => NextService.cacheClear(item));
      return Promise.all(promises);
    },
    onMutate: () => enqueueSnackbar(`Önbellek siliniyor...`),
    onSuccess: () => {
      //const hasErrorCheck = data.some((item) => item?.isError);
      enqueueSnackbar(`Önbellek başarıyla silindi.`);
    },
    onError: (err: FetchError) => {
      fetchErrorSnackbar(err as FetchError);
    },
  });

  useEffect(() => {
    if (!userProfile.data?.data) return;
    setDisplayName(
      `${userProfile?.data?.data?.name} ${userProfile?.data?.data?.surname}`
    );
  }, [userProfile.data]);

  const { mutate: logout, isPending: isLogoutLoading } = useMutation({
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

  const handleCacheMenuClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setCacheMenuAnchorEl(event.currentTarget);

  const handleUserMenuClose = () => setUserMenuAnchorEl(null);
  const handleCacheMenuClose = () => setCacheMenuAnchorEl(null);

  const handleClickMyProfile = () => {
    handleUserMenuClose();
    setFormDrawerData({
      title: "Profilimi Düzenle",
      open: true,
      content: <MyProfile />,
      submitButtonText: "Güncelle",
      submitDisabled: false,
    });
  };

  const handleClearCache = (data: CacheBodyModel[]) => {
    handleCacheMenuClose();
    cacheClear(data);
  };

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

          <Tooltip title="Cache Sil">
            <IconButton
              onClick={handleCacheMenuClick}
              disabled={isCacheClearLoading}
            >
              {isCacheClearLoading ? (
                <CircularProgress size={15} />
              ) : (
                <CachedIcon />
              )}
            </IconButton>
          </Tooltip>

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
        {displayName && [
          <Box px={2} py={1} mb={0.5} key="userProfile">
            <Typography color="grey.A400" fontSize={16} fontWeight={500}>
              {displayName}
            </Typography>
          </Box>,
          <Divider key="divider" />,
        ]}

        <MenuItem onClick={handleClickMyProfile} disabled={isLogoutLoading}>
          Profilim
        </MenuItem>
        <MenuItem onClick={() => logout()} disabled={isLogoutLoading}>
          {isLogoutLoading ? "Bekleyiniz..." : "Çıkış Yap"}
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={cacheMenuAnchorEl}
        open={cacheMenuOpen}
        onClose={handleCacheMenuClose}
        MenuListProps={{
          style: {
            minWidth: "200px",
          },
        }}
      >
        <MenuItem onClick={() => handleClearCache([{ path: "/" }])}>
          Tüm önbelleği sil
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleClearCache([
              {
                path: "(blog)/[guid]",
                type: "page",
              },
              {
                path: "(blog)/page/[page]",
                type: "page",
              },
            ])
          }
        >
          Sayfa ve makalelerin önbelleğini sil
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleClearCache([
              {
                path: "(blog)/category/[guid]",
                type: "page",
              },
              {
                path: "(blog)/category/[guid]/page/[page]",
                type: "page",
              },
              {
                path: "(blog)/category/[...guid]",
                type: "page",
              },
            ])
          }
        >
          Kategorilerin önbelleğini sil
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleClearCache([
              {
                path: "(blog)/tag/[guid]",
                type: "page",
              },
              {
                path: "(blog)/tag/[guid]/page/[page]",
                type: "page",
              },
            ])
          }
        >
          Etiketlerin önbelleğini sil
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
