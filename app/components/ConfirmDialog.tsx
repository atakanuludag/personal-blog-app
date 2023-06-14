// ** mui
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

// ** hooks
import useComponentContext from '@/hooks/useComponentContext'

export default function ConfirmDialogComponent() {
  const { confirmDialog, handleConfirmDialogClose } = useComponentContext()
  const { open, title, content, handleConfirmFunction, maxWidth } =
    confirmDialog

  const handleClose = () => handleConfirmDialogClose()

  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth || 'xs'}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Kapat</Button>
        <Button onClick={handleConfirmFunction} autoFocus>
          Onayla
        </Button>
      </DialogActions>
    </Dialog>
  )
}
