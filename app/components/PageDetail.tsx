// ** next
import dynamic from 'next/dynamic'

// ** third party
import moment from 'moment'
const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false },
)

// ** mui
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

// ** models
import IPage from '@/models/PageModel' // todo: IPage gibi başında I olan model tiplemeleri düzeltilecek.

type PageDetailProps = {
  data: IPage
}

const Page = styled('article')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

const Title = styled('h2')(() => ({
  margin: 0,
  fontWeight: 'bold',
  fontSize: '2rem',
}))

const Content = styled('div')(({}) => ({}))

const StackItem = styled('p')(({ theme }) => ({
  padding: 0,
  margin: 0,
  color: theme.palette.secondary.contrastText,
  fontSize: '0.770rem',
}))

export default function PageDetail({ data }: PageDetailProps) {
  return (
    <Page>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item>
          <Title>{data.title}</Title>
        </Grid>

        <Grid item>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}
          >
            <StackItem>{moment(data.publishingDate).fromNow()}</StackItem>
            <StackItem>{`${data.viewCount} okunma`}</StackItem>
          </Stack>
        </Grid>

        <Grid item xs={12} width="100%">
          <MarkdownPreview source={data.content} />
        </Grid>
      </Grid>
    </Page>
  )
}
