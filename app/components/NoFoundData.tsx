import { useRouter } from 'next/router'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

interface INoFoundDataProps {
  message?: string
}

const defaultMsg = `Herhangi bir veri bulunamadı. İsterseniz sayfayı tekrar yenileyebilirsiniz.`

function NoFoundData({ message = defaultMsg, ...props }: INoFoundDataProps) {
  const router = useRouter()

  return (
    <Stack
      spacing={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      {...props}
    >
      <Typography variant="h5" gutterBottom component="div">
        {message}
      </Typography>

      <Button variant="contained" onClick={() => router.reload()}>
        Sayfayı Yenile
      </Button>
    </Stack>
  )
}

export default NoFoundData
