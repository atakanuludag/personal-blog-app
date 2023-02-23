// ** react
import { ReactNode } from 'react'

// ** mui
import Box from '@mui/material/Box'

// ** layouts
import Content from '@/layouts/Content'
import NavigationAdmin from '@/layouts/NavigationAdmin'

// ** models
import { LayoutPageType } from '@/models/enums'
import AppPropsModel from '@/models/AppPropsModel'

type LayoutAdminPageProps = {
  children: ReactNode
} & AppPropsModel

export default function LayoutAdminPage({ children }: LayoutAdminPageProps) {
  return (
    <Box display="flex">
      <NavigationAdmin />
      <Content children={children} layoutPageType={LayoutPageType.AdminPage} />
    </Box>
  )
}
