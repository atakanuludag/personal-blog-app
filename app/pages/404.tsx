import React from 'react'
import { GetServerSideProps, NextPage } from 'next/types'
import { NextSeo } from 'next-seo'
import { default as NextLink } from 'next/link'
import { default as MaterialLink } from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import LayoutFullPage from '@/layouts/LayoutFullPage'
import IPageProps from '@/models/IPageProps'

import SearchIcon from '@mui/icons-material/Search'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'

const Title = styled(Typography)(({ theme }) => ({
  letterSpacing: theme.spacing(5),
}))
const SubTitle = styled(Typography)(({ theme }) => ({}))

type NotFoundPageComponent = NextPage<IPageProps> & {
  layout: typeof LayoutFullPage
}

const NotFoundPage: NotFoundPageComponent = () => {
  return (
    <>
      <NextSeo title="404 Sayfa Bulunamadı" nofollow noindex />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignContent="center"
        spacing={3}
      >
        <Grid item>
          <Title align="center" variant="h1">
            404
          </Title>
        </Grid>

        <Grid item>
          <SubTitle align="center" variant="h4">
            Sayfa Bulunamadı 😔
          </SubTitle>
        </Grid>

        <Grid item>
          <Typography align="center" variant="body2" component="span">
            <NextLink href="" passHref>
              <MaterialLink color="secondary">Buraya</MaterialLink>
            </NextLink>{' '}
            tıklayarak ana sayfaya dönebilir veya aşağıdan arama yapabilirsiniz.
          </Typography>
        </Grid>

        <Grid item>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Site içinde ara...
            </InputLabel>
            <OutlinedInput
              type="text"
              value=""
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    // onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

NotFoundPage.layout = LayoutFullPage
export default NotFoundPage
