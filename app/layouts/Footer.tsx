import React from 'react'
import Divider from '@mui/material/Divider'
import { makeStyles } from '@mui/styles'

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

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.root}>
      <small className={classes.copyright}>© Atakan Yasin Uludağ</small>
    </footer>
  )
}

export default Footer
