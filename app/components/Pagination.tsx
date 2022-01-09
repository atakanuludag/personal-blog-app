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

// const Item = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(2),
// }))

export default function Pagination({}: IPaginationProps) {
  const handleNextPage = () => {}

  return (
    <div className="">
      <Button variant="contained" size="large" onClick={handleNextPage}>
        Daha fazla
      </Button>
    </div>
  )
}
