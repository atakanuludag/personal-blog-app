import { APP_VERSION } from '@/config'
import makeStyles from '@mui/styles/makeStyles'
import Typography from '@mui/material/Typography'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '25px 0px',
  },
}))

export default function Footer() {
  const classes = useStyles()

  return (
    <footer className={classes.root}>
      <Typography variant="caption" display="block" color="grey">
        © Atakan Yasin Uludağ v{APP_VERSION}
      </Typography>
    </footer>
  )
}
