// ** mui
import Box from '@mui/material/Box'

// ** hooks
import useSettingsContext from '@/hooks/useSettingsContext'

// ** models
import { PaletteMode } from '@/models/enums'

type ThemeModeSwitchProps = {
  isMobile?: boolean
}

export default function ThemeModeSwitch({
  isMobile = false,
}: ThemeModeSwitchProps) {
  const { themeMode, handleChangeThemeMode } = useSettingsContext()
  return (
    <Box
      position="fixed"
      top={!isMobile ? 0 : 20}
      right={!isMobile ? 0 : 20}
      display="flex"
      p={!isMobile ? 1.5 : 0}
      alignItems="flex-start"
    >
      <Box position="relative">
        <input
          id="theme-mode-toggle"
          className="theme-mode-toggle"
          type="checkbox"
          checked={themeMode === PaletteMode.DARK ? true : false}
          onChange={(e) =>
            handleChangeThemeMode(
              e.target.checked ? PaletteMode.DARK : PaletteMode.LIGHT,
            )
          }
        />
        <label
          className="theme-mode-toggle-label"
          htmlFor="theme-mode-toggle"
        />
      </Box>
    </Box>
  )
}
