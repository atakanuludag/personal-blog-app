import React from 'react'
import { makeStyles } from '@mui/styles'
import Navigation from '@/layouts/Navigation'
import Content from '@/layouts/Content'

interface IMain {
  children: React.ReactNode
}

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

  return (
    <div className={classes.root}>
      <Navigation />
      <Content children={children} />
    </div>
  )
}
