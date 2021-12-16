import React from 'react'
import { Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import Container from '@mui/material/Container'
import Footer from '@/layouts/Footer'

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(12),
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(3),
    },
  },
}))
interface IContent {
  children: React.ReactNode
}

export default function Content({ children }: IContent) {
  const classes = useStyles()
  return (
    <Container component="main" maxWidth="md" fixed className={classes.content}>
      {children}
      <Footer />
    </Container>
  )
}
