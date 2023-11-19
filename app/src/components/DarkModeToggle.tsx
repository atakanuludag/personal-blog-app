"use client";

// ** mui
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

// ** icons
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

// ** models
import { PaletteMode } from "@/models/enums";

// ** hooks
import useSettingsContext from "@/hooks/useSettingsContext";

type DarkModeToggleProps = {
  isAdminAppBar?: boolean;
};
export default function DarkModeToggle({
  isAdminAppBar = false,
}: DarkModeToggleProps) {
  const { themeMode, handleChangeThemeMode } = useSettingsContext();

  const ToggleInput = () => (
    <Tooltip
      title={themeMode === PaletteMode.DARK ? "Açık moda geç" : "Koyu moda geç"}
    >
      <IconButton
        onClick={() =>
          handleChangeThemeMode(
            themeMode === PaletteMode.DARK
              ? PaletteMode.LIGHT
              : PaletteMode.DARK
          )
        }
      >
        {themeMode === PaletteMode.DARK ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );

  if (isAdminAppBar) return <ToggleInput />;

  return (
    <Box display="fixed" position="relative" top={3} right={3}>
      <ToggleInput />
    </Box>
  );
}
