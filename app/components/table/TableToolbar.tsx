import { useState } from 'react'
import Toolbar from '@mui/material/Toolbar'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

interface IMuiTableHead {
  selectedCount: number
}

const MuiTableToolbar = ({ selectedCount }: IMuiTableHead) => {
  const [deleteLoading, setDeleteLoading] = useState(false)

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        //   ...(numSelected > 0 && {
        //     bgcolor: (theme) =>
        //       alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        //   }),
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <p>filters</p>
        </Grid>

        <Grid
          item
          xs={3}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <LoadingButton
            loading={deleteLoading}
            loadingPosition="start"
            startIcon={<DeleteForeverIcon />}
            variant="outlined"
            disabled={selectedCount <= 0}
          >
            {`Seçilenleri Sil ${selectedCount > 0 ? `(${selectedCount})` : ''}`}
          </LoadingButton>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default MuiTableToolbar
