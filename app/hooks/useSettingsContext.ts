import { useContext } from 'react'
import { SettingsContext, PaletteMode } from '@/context/SettingsContext'

const useSettings = () => useContext(SettingsContext)

export default useSettings
export { PaletteMode }
