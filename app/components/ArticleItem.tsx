// ** next
import { default as NextLink } from 'next/link'
import Image from 'next/image'

// ** third party
import moment from 'moment'

// ** mui
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import { default as MaterialLink } from '@mui/material/Link'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

// ** icons
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

// ** hooks
import useText from '@/hooks/useText'

// ** models
import ArticleModel from '@/models/ArticleModel'

// ** utils
import generateFileUrl from '@/utils/GenerateFileUrl'

// ** config

import { Ref, forwardRef } from 'react'

type ArticleItemProps = {
  data: ArticleModel
}

const Item = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(6),
}))

const StyledImage = styled(Image)(({ theme }) => ({
  maxWidth: '150px',
  [theme.breakpoints.down('md')]: {
    maxWidth: 'none',
    minWidth: '100%',
  },
}))

const Title = styled('h3')(() => ({
  margin: '0px !important',
  fontSize: '1.275rem',
}))

const Link: any = styled(MaterialLink)(({ theme }) => ({
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

function ArticleItem({ data }: ArticleItemProps, ref?: Ref<HTMLDivElement>) {
  //todo: ref props?

  const { textLimit } = useText()
  let coverImage = null

  if (data.coverImage) {
    coverImage = generateFileUrl(data.coverImage)
  }

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
          {coverImage && (
            <StyledImage
              src={coverImage}
              alt={data.title}
              width="150"
              height="150"
            />
          )}
        </Grid>

        <Grid item xs={12} sm>
          <div>
            <Title>
              <MaterialLink component={NextLink} href={`/${data.guid}`}>
                {data.title}
              </MaterialLink>
            </Title>

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

            <Description>{textLimit(data.shortDescription, 330)}</Description>
            <Button
              LinkComponent={NextLink}
              href={`/${data.guid}`}
              color="secondary"
            >
              Devamını oku <ArrowRightAltIcon />
            </Button>
          </div>
        </Grid>
      </Grid>
    </Item>
  )
}

export default forwardRef(ArticleItem)
