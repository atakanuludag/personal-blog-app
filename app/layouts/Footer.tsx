import React from 'react'
import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '25px 0px',
  },
  copyright: {
    color: '#747474',
  },
}))

export default function Footer() {
  const classes = useStyles()

  return (
    <footer className={classes.root}>
      <small className={classes.copyright}>© Atakan Yasin Uludağ</small>
    </footer>
  )
}
