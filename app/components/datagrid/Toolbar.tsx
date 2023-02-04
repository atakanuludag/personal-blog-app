// ** mui
import { GridToolbarContainer } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

// ** icons
import DeleteIcon from '@mui/icons-material/Delete'

const StyledGridToolbarContainer = styled(GridToolbarContainer)(
  ({ theme }) => ({
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey[700],
    padding: 10,
  }),
)

type MuiToolbarProps = {
  loading: boolean
  selected: string[]
}

export default function MuiToolbar({ loading, selected }: MuiToolbarProps) {
  return (
    <StyledGridToolbarContainer>
      {selected.length > 0 && (
        <Button
          variant="contained"
          startIcon={<DeleteIcon fontSize="small" />}
          size="small"
          disabled={loading}
        >
          Seçilenleri sil
        </Button>
      )}
    </StyledGridToolbarContainer>
  )
}
