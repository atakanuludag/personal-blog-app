import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress'

export enum LoadingType {
  Circular,
  Linear,
}

interface ILoadingProps {
  type?: LoadingType
}

function Loading({ type = LoadingType.Circular }: ILoadingProps) {
  if (type === LoadingType.Circular) {
    return (
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={40}
        thickness={4}
        value={100}
      />
    )
  } else return <>test</>
}

export default Loading
