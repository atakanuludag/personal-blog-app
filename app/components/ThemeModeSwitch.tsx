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
    <Box display="flex" p={!isMobile ? 1.5 : 0}>
      <input
        className="theme-mode-toggle"
        type="checkbox"
        checked={themeMode === PaletteMode.DARK ? true : false}
        onChange={(e) =>
          handleChangeThemeMode(
            e.target.checked ? PaletteMode.DARK : PaletteMode.LIGHT,
          )
        }
      />
    </Box>
  )
}
