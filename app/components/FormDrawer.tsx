// ** mui
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

// ** icons
import CloseIcon from '@mui/icons-material/Close'

// ** hooks
import useComponentContext from '@/hooks/useComponentContext'

const StyledActionButtons = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  padding: 10,
  backgroundColor: theme.palette.grey[800],
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  borderTopColor: theme.palette.grey[800],
}))

export default function FormDrawer() {
  const { formDrawer, handleFormDrawerClose, setFormDrawerData } =
    useComponentContext()

  const { open, content, title, loading, submitButtonText } = formDrawer

  const handleClose = () => {
    if (loading) return
    handleFormDrawerClose()
  }

  const handleSubmit = () => {
    setFormDrawerData({
      ...formDrawer,
      submit: true,
    })
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      sx={{ overflow: 'hidden' }}
    >
      <Box minWidth="20vw" height="100%" position="relative">
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleClose} disabled={loading}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box paddingLeft={3} paddingRight={3} paddingBottom={1}>
          <Typography variant="h5" fontWeight="600">
            {title}
          </Typography>
        </Box>

        <Box
          overflow="auto"
          height="89vh"
          paddingTop={1}
          paddingLeft={3}
          paddingRight={3}
        >
          {content}
        </Box>

        <StyledActionButtons>
          <Button size="large" onClick={handleSubmit} disabled={loading}>
            {submitButtonText?.toLocaleUpperCase()}
          </Button>
        </StyledActionButtons>
      </Box>
    </Drawer>
  )
}
