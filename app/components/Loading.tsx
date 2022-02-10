import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export enum LoadingType {
  Circular,
  Linear,
}

interface ILoadingProps {
  type?: LoadingType
}

function Loading({ type = LoadingType.Circular, ...props }: ILoadingProps) {
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

export default Loading
