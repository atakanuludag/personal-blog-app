// ** mui
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export enum LoadingType {
  Circular,
  Linear,
}

type LoadingProps = {
  type?: LoadingType
}

export default function Loading({
  type = LoadingType.Circular,
  ...props
}: LoadingProps) {
  if (type === LoadingType.Circular) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        sx={{ padding: (theme) => theme.spacing(2) }}
      >
        <CircularProgress {...props} />
      </Box>
    )
  } else return <>Linear Progress</>
}
