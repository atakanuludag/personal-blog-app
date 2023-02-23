// ** react
import { ReactNode } from 'react'

// ** mui
import Box from '@mui/material/Box'

//  ** layouts
import Navigation from '@/layouts/Navigation'
import Content from '@/layouts/Content'

// ** models
import { LayoutPageType } from '@/models/enums'
import AppPropsModel from '@/models/AppPropsModel'

type LayoutBlogPageProps = {
  children: ReactNode
} & AppPropsModel

export default function LayoutBlogPage({
  children,
  ...props
}: LayoutBlogPageProps) {
  return (
    <Box display="flex">
      <Navigation {...props} />
      <Content children={children} layoutPageType={LayoutPageType.BlogPage} />
    </Box>
  )
}
