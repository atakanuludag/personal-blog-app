// ** react
import { ReactNode } from 'react'

// ** styles
import { makeStyles } from '@mui/styles'

// ** layouts
import Content from '@/layouts/Content'
import NavigationAdmin from '@/layouts/NavigationAdmin'

// ** models
import { LayoutPageType } from '@/models/enums'
import AppPropsModel from '@/models/AppPropsModel'

type LayoutAdminPageProps = {
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

export default function LayoutAdminPage({ children }: LayoutAdminPageProps) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <NavigationAdmin />
      <Content children={children} layoutPageType={LayoutPageType.AdminPage} />
    </div>
  )
}
