"use client";

// ** react
import { createContext, ReactNode, useState } from "react";

// ** models
import { PaletteMode } from "@/models/enums";

// ** config
import { COOKIE_NAMES } from "@/config";

export type SettingsModelContextProps = {
  themeMode: PaletteMode;
  handleChangeThemeMode: (mode: PaletteMode) => void;
  adminNavigationOpen: boolean;
  handleChangeAdminNavigationTrigger: () => void;
};

export const SettingsContext = createContext<SettingsModelContextProps>({
  themeMode: PaletteMode.DARK,
  handleChangeThemeMode: () => {},
  adminNavigationOpen: true,
  handleChangeAdminNavigationTrigger: () => {},
});

type SettingsProviderProps = {
  children: ReactNode;
  initialThemeMode: PaletteMode;
  initialAdminNavigationOpen: boolean;
};

const SettingsProvider = ({
  children,
  initialThemeMode,
  initialAdminNavigationOpen,
}: SettingsProviderProps) => {
  const [themeMode, setThemeMode] = useState<PaletteMode>(initialThemeMode);
  const [adminNavigationOpen, setAdminNavigationOpen] = useState<boolean>(
    initialAdminNavigationOpen
  );

  const handleChangeThemeMode = (mode: PaletteMode) => {
    setThemeMode(mode);
    document.cookie = `${COOKIE_NAMES.THEME}=${mode}; path=/`;
  };

  const handleChangeAdminNavigationTrigger = () => {
    setAdminNavigationOpen(!adminNavigationOpen);
    document.cookie = `${
      COOKIE_NAMES.ADMIN_NAVIGATION
    }=${!adminNavigationOpen}; path=/`;
  };

  return (
    <SettingsContext.Provider
      value={{
        themeMode,
        handleChangeThemeMode,
        adminNavigationOpen,
        handleChangeAdminNavigationTrigger,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
