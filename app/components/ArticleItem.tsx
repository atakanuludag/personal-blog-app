import React, { forwardRef, Ref } from 'react'
import moment from 'moment'
import { default as NextLink } from 'next/link'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import useText from '@/hooks/useText'
import { default as MaterialLink } from '@mui/material/Link'
import IArticle from '@/models/IArticle'

interface IArticleItemProps {
  data: IArticle
}

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

const Image = styled('img')(({ theme }) => ({
  maxWidth: '150px',
  [theme.breakpoints.down('md')]: {
    width: '80%',
    maxWidth: 'none',
  },
}))

const Title = styled('h3')(() => ({
  margin: '0px !important',
  fontSize: '1.275rem',
}))

const Link = styled(MaterialLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.secondary.main,
  '&:hover': {
    textDecoration: 'underline',
  },
}))

const Description = styled('p')(() => ({
  margin: '5px 0px',
  fontSize: '0.770rem',
}))

const StackItem = styled('p')(({ theme }) => ({
  padding: 0,
  margin: 0,
  color: theme.palette.secondary.contrastText,
  fontSize: '0.770rem',
}))

function ArticleItem({ data }: IArticleItemProps, ref: Ref<HTMLDivElement>) {
  const { textLimit } = useText()

  const coverImage = `./example-thumb.jpeg`
  //data.coverImage

  return (
    <Item ref={ref}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        alignContent="end"
        spacing={1}
      >
        <Grid item>
          <Image src={coverImage} alt={data.title} />
        </Grid>

        <Grid item xs={12} sm>
          <div>
            <Title>
              <NextLink href={`/${data.guid}`} passHref>
                <Link>{data.title}</Link>
              </NextLink>
            </Title>

            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={1}
            >
              <StackItem>{moment(data.publishingDate).fromNow()}</StackItem>
              <StackItem>5 min read</StackItem>
              <StackItem>{`${data.viewCount} okunma`}</StackItem>
              <StackItem>{`${data.likeCount} beğeni`}</StackItem>
            </Stack>

            <Description>{textLimit(data.shortDescription, 330)}</Description>
            <NextLink href={`/${data.guid}`} passHref>
              <Button color="secondary">
                Devamını oku <ArrowRightAltIcon />
              </Button>
            </NextLink>
          </div>
        </Grid>
      </Grid>
    </Item>
  )
}

export default forwardRef(ArticleItem)
