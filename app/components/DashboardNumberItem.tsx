import React from 'react'
import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    height: 240,
  },
  icon: {
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    padding: theme.spacing(2),
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
  },
  number: {
    height: 55,
  },
}))

interface IDashboardNumberItem {
  icon: JSX.Element
  title: string
  count: number
  loading: boolean
}

function DashboardNumberItem({
  icon,
  title,
  count,
  loading,
}: IDashboardNumberItem) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <div className={classes.icon}>{icon}</div>

      <Box component="div" className={classes.number}>
        {loading ? (
          <CircularProgress size={20} color="primary" sx={{ color: '#000' }} />
        ) : (
          <Typography variant="h3">{count}</Typography>
        )}
      </Box>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  )
}

export default DashboardNumberItem
