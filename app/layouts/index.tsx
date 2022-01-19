import React, { ReactNode, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import Navigation from '@/layouts/Navigation'
import Content from '@/layouts/Content'
import useInitialDarkMode from '@/hooks/useInitialDarkMode'
import useSettingQuery from '@/hooks/queries/useSettingQuery'
import useStoreSettings from '@/hooks/useStoreSettings'

interface IMain {
  children: ReactNode
}
//Todo: scroolbar light ve dark temada farklı renklerde olacak...
const useStyles = makeStyles({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '6px',
      backgroundColor: '#2a2a2a',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgb(100 100 100)',
      borderRadius: '.5rem',
    },
  },
  root: {
    display: 'flex',
  },
})

export default function Main({ children }: IMain) {
  const classes = useStyles()
  // const initialDarkMode = useInitialDarkMode()

  // const { settingQuery } = useSettingQuery()
  // const { settingsStore, setSettingsStore } = useStoreSettings()
  // const settings = settingQuery()

  // useEffect(() => {
  //   //setSettingsStore({ ...settingsStore, darkMode: initialDarkMode() })
  // }, [])

  // useEffect(() => {
  //   if (settings.isLoading) return
  //   let data = {}
  //   settings.data?.forEach((s) => {
  //     data = {
  //       ...data,
  //       [s.name]: isNaN(Number(s.value)) ? s.value : Number(s.value),
  //     }
  //   })
  //   setSettingsStore({ ...settingsStore, ...data })
  // }, [settings.isLoading])

  return (
    <div className={classes.root}>
      <Navigation />
      <Content children={children} />
    </div>
  )
}
