import React from 'react'
import { Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import Container from '@mui/material/Container'
import Footer from '@/layouts/Footer'

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',

    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(6),
    },
  },
}))
interface IContent {
  children: React.ReactNode
}

const Content = ({ children }: IContent): React.ReactElement => {
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="lg" fixed className={classes.content}>
      {children}
      <Footer />
    </Container>
  )
}

export default Content
