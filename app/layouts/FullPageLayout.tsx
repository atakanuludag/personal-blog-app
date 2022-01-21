import React, { ReactNode } from 'react'
import { makeStyles } from '@mui/styles'
import Content from '@/layouts/Content'
import { LayoutPageType } from '@/models/enums'

interface IMain {
  children: ReactNode
}
//Todo: scroolbar light ve dark temada farklı renklerde olacak...
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

export default function FullPageLayout({ children }: IMain) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Content children={children} layoutPageType={LayoutPageType.FullPage} />
    </div>
  )
}
