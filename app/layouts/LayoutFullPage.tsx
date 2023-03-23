// ** react
import { ReactNode } from 'react'

// ** mui
import Box from '@mui/material/Box'

// ** third party
import { NextSeo } from 'next-seo'

// ** layouts
import Content from '@/layouts/Content'

// ** models
import { LayoutPageType } from '@/models/enums'
import AppPropsModel from '@/models/AppPropsModel'

type LayoutFullPageProps = {
  children: ReactNode
  title: string
} & AppPropsModel

export default function LayoutBlogPage({
  children,
  title,
}: LayoutFullPageProps) {
  return (
    <Box display="flex">
      {title && <NextSeo title={title} description={title} />}
      <Content children={children} layoutPageType={LayoutPageType.FullPage} />
    </Box>
  )
}
