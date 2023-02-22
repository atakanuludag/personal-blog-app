// ** next
import { default as NextLink } from 'next/link'

// ** third party
import moment from 'moment'

// ** mui
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'

// ** models
import ArticleModel from '@/models/ArticleModel'

// ** components
import ArticleLikeButton from '@/components/ArticleLikeButton'

type ArticleDetailProps = {
  data: ArticleModel
  currentIpAdressIsLiked: boolean
}

const Article = styled('article')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

const Image = styled('img')(({ theme }) => ({
  maxWidth: '100%',
}))

const Title = styled('h2')(() => ({
  margin: 0,
  fontWeight: 'bold',
  fontSize: '2rem',
}))

const Content = styled('div')(({ theme }) => ({}))

const StackItem = styled('p')(({ theme }) => ({
  padding: 0,
  margin: 0,
  color: theme.palette.secondary.contrastText,
  fontSize: '0.770rem',
}))

export default function ArticleDetail({
  data,
  currentIpAdressIsLiked,
}: ArticleDetailProps) {
  const coverImage = `./blog-post-banner.jpeg`
  //item.coverImage

  return (
    <Article>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid container item xs={12}>
          <Grid item xs={10}>
            <Title>{data.title}</Title>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <ArticleLikeButton
              itemId={data._id}
              likedCount={data.likedCount}
              currentIpAdressIsLiked={currentIpAdressIsLiked}
            />
          </Grid>
        </Grid>

        <Grid item>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}
          >
            <StackItem>{moment(data.publishingDate).fromNow()}</StackItem>
            <StackItem>
              {data.readingTimeMin <= 0
                ? '1 dakikadan az'
                : `${data.readingTimeMin} dakikalık okuma`}
            </StackItem>
            <StackItem>{`${data.viewCount} okunma`}</StackItem>
            <StackItem>{`${data.likedCount} beğeni`}</StackItem>
          </Stack>
        </Grid>

        <Grid item>
          <Image src={coverImage} alt={data.title} />
        </Grid>

        <Grid item>
          <Content dangerouslySetInnerHTML={{ __html: data.content }}></Content>
        </Grid>

        <Grid item xs={12}></Grid>

        <Grid item xs={12}>
          <Stack direction="row" spacing={1}>
            {data.tags.map((tag) => (
              <Chip
                key={tag._id}
                label={tag.title}
                component={NextLink}
                href={`/tag/${tag.guid}`}
                variant="outlined"
                size="small"
                clickable
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Article>
  )
}
