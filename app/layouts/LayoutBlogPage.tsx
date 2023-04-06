// ** react
import { ReactNode } from 'react'

// ** mui
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'

//  ** layouts
import Navigation from '@/layouts/Navigation'
import Content from '@/layouts/Content'

// ** models
import { LayoutPageType } from '@/models/enums'
import AppPropsModel from '@/models/AppPropsModel'

// ** components
import ThemeModeSwitch from '@/components/ThemeModeSwitch'

type LayoutBlogPageProps = {
  children: ReactNode
} & AppPropsModel

export default function LayoutBlogPage({
  children,
  ...props
}: LayoutBlogPageProps) {
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box display="flex">
      <Navigation {...props} />
      <Content children={children} layoutPageType={LayoutPageType.BlogPage} />
      {isMdUp && <ThemeModeSwitch />}
    </Box>
  )
}
