// ** react
import { ReactNode } from 'react'

// ** mui
import { makeStyles } from '@mui/styles'

// ** layouts
import Content from '@/layouts/Content'

// ** models
import { LayoutPageType } from '@/models/enums'
import AppPropsModel from '@/models/AppPropsModel'

type LayoutFullPageProps = {
  children: ReactNode
} & AppPropsModel

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

export default function LayoutBlogPage({ children }: LayoutFullPageProps) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Content children={children} layoutPageType={LayoutPageType.FullPage} />
    </div>
  )
}
