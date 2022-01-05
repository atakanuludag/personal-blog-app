import React from 'react'
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

interface IPaginationProps {}

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

const Description = styled('p')(() => ({
  margin: '5px 0px',
  fontSize: '0.770rem',
}))

const StackItem = styled('p')(({ theme }) => ({
  padding: 0,
  margin: 0,
  color: 'rgba(255,255,255,0.4)',
  fontSize: '0.770rem',
}))

export default function Pagination({}: IPaginationProps) {
  return (
    <div className="">
      <Button variant="contained" size="large">
        Sonraki Sayfa
      </Button>
    </div>
  )
}
