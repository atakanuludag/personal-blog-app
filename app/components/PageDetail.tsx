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
import IPage from '@/models/IPage'

interface IPageDetailProps {
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

const Content = styled('div')(({ theme }) => ({}))

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

function PageDetail({ data }: IPageDetailProps) {
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

        <Grid item>
          <Content dangerouslySetInnerHTML={{ __html: data.content }}></Content>
        </Grid>
      </Grid>
    </Page>
  )
}

export default PageDetail
