// ** react
import { ReactNode } from 'react'

// ** third party
import { css, cx } from '@emotion/css'

// ** mui
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Container from '@mui/material/Container'

// ** models
import { LayoutPageType } from '@/models/enums'

// ** layouts
import Footer from '@/layouts/Footer'

type ContentProps = {
  children: ReactNode
  layoutPageType: LayoutPageType
}

export default function Content({ children, layoutPageType }: ContentProps) {
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

  const containerGeneralCSS = css`
    flex-grow: 1;
    height: 92.6vh;
  `

  const blogContentCSS = css`
    padding-top: ${isMdUp ? theme.spacing(5) : theme.spacing(9)};
    padding-left: ${isMdUp ? theme.spacing(20) : theme.spacing(5)};
    padding-right: ${isMdUp ? theme.spacing(20) : theme.spacing(5)};
  `

  const adminContentCSS = css`
    padding-top: ${isMdUp ? theme.spacing(5) : theme.spacing(10)};
  `

  const containerCSS = cx(
    containerGeneralCSS,
    layoutPageType === LayoutPageType.BlogPage
      ? blogContentCSS
      : adminContentCSS,
  )

  return (
    <Container component="main" maxWidth={false} className={containerCSS}>
      {children}
      <Footer />
    </Container>
  )
}
