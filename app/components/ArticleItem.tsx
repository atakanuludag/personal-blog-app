import React from 'react'
import moment from 'moment'
import { default as NextLink } from 'next/link'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import IArticle from '@/models/IArticle'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import useText from '@/hooks/useText'
import { default as MaterialLink } from '@mui/material/Link'

interface IArticleItemProps {
  item: IArticle
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
  //color: 'rgba(255,255,255,0.4)',
  color: theme.palette.secondary.contrastText,
  fontSize: '0.770rem',
}))

export default function ArticleItem({ item }: IArticleItemProps) {
  const { textLimit } = useText()

  const coverImage = `./example-thumb.jpeg`
  //item.coverImage
  return (
    <Item>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        alignContent="end"
        spacing={1}
      >
        <Grid item>
          <Image src={coverImage} alt={item.title} />
        </Grid>

        <Grid item xs={12} sm>
          <div>
            <Title>
              <NextLink href={`/${item.guid}`} passHref>
                <Link>{item.title}</Link>
              </NextLink>
            </Title>

            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={1}
            >
              <StackItem>{moment(item.publishingDate).fromNow()}</StackItem>
              <StackItem>5 min read</StackItem>
              <StackItem>{`${item.viewCount} okunma`}</StackItem>
              <StackItem>{`${item.likeCount} beğeni`}</StackItem>
            </Stack>

            <Description>{textLimit(item.shortDescription, 330)}</Description>
            <NextLink href={`/${item.guid}`} passHref>
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
