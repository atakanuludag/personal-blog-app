// ** react
import { Dispatch, SetStateAction } from 'react'

// ** mui
import { GridToolbarContainer } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

// ** third party
import { useSnackbar } from 'notistack'
import { useQueryClient } from 'react-query'

// ** icons
import DeleteIcon from '@mui/icons-material/Delete'

const StyledGridToolbarContainer = styled(GridToolbarContainer)(
  ({ theme }) => ({
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey[700],
    padding: 10,
    display: 'flex',
    justifyContent: 'flex-end',
  }),
)

export type MuiToolbarProps = {
  queryName: string
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  selected: string[]
  deleteService: (id: string) => Promise<void>
}

export default function MuiToolbar({
  queryName,
  loading,
  setLoading,
  selected,
  deleteService,
}: MuiToolbarProps) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  const handleSelectedDeleteButton = async () => {
    setLoading(true)
    for await (const id of selected) {
      await deleteService(id)
    }
    queryClient.invalidateQueries(queryName)
    enqueueSnackbar('Seçtiğiniz kayıtlar başarıyla silindi.', {
      variant: 'success',
    })
    setLoading(false)
  }

  return (
    <StyledGridToolbarContainer>
      <Button
        variant="contained"
        startIcon={<DeleteIcon fontSize="small" />}
        size="small"
        disabled={loading || selected.length <= 0}
        onClick={handleSelectedDeleteButton}
      >
        Seçilenleri sil
      </Button>
    </StyledGridToolbarContainer>
  )
}
