// ** react
import { ReactNode } from 'react'

// ** mui
import Box from '@mui/material/Box'

// ** third party
import { NextSeo } from 'next-seo'

// ** layouts
import Content from '@/layouts/Content'
import NavigationAdmin from '@/layouts/NavigationAdmin'

// ** models
import { LayoutPageType } from '@/models/enums'
import AppPropsModel from '@/models/AppPropsModel'

type LayoutAdminPageProps = {
  children: ReactNode
  title: string
} & AppPropsModel

export default function LayoutAdminPage({
  children,
  title,
}: LayoutAdminPageProps) {
  return (
    <Box display="flex">
      {title && <NextSeo title={title} description={title} />}

      <NavigationAdmin />
      <Content children={children} layoutPageType={LayoutPageType.AdminPage} />
    </Box>
  )
}
