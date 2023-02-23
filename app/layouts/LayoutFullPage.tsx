// ** react
import { ReactNode } from 'react'

// ** mui
import Box from '@mui/material/Box'

// ** layouts
import Content from '@/layouts/Content'

// ** models
import { LayoutPageType } from '@/models/enums'
import AppPropsModel from '@/models/AppPropsModel'

type LayoutFullPageProps = {
  children: ReactNode
} & AppPropsModel

export default function LayoutBlogPage({ children }: LayoutFullPageProps) {
  return (
    <Box display="flex">
      <Content children={children} layoutPageType={LayoutPageType.FullPage} />
    </Box>
  )
}
