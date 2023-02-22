import React from 'react'
import { NextPage } from 'next/types'
import Grid from '@mui/material/Grid'
import ArticleIcon from '@mui/icons-material/Article'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import FilePresentIcon from '@mui/icons-material/FilePresent'
import PageProps from '@/models/AppPropsModel'
import LayoutAdminPage from '@/layouts/LayoutAdminPage'
import getServerSideProps from '@/utils/AdminServerSideProps'
import DashboardNumberItem from '@/components/DashboardNumberItem'
import useAdminDashboardReport from '@/hooks/queries/useAdminDashboardReport'

type AdminComponent = NextPage<PageProps> & {
  layout: typeof LayoutAdminPage
}

const AdminHome: AdminComponent = ({}: PageProps) => {
  const { adminDashboardReportQuery } = useAdminDashboardReport()
  const { data, isLoading } = adminDashboardReportQuery()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <DashboardNumberItem
          icon={<ArticleIcon fontSize="large" />}
          title="Makale Sayısı"
          count={data ? data.articleCount : 0}
          loading={isLoading}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <DashboardNumberItem
          icon={<AutoStoriesIcon fontSize="large" />}
          title="Sayfa Sayısı"
          count={data ? data.pageCount : 0}
          loading={isLoading}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <DashboardNumberItem
          icon={<FilePresentIcon fontSize="large" />}
          title="Medya Sayısı"
          count={data ? data.fileCount : 0}
          loading={isLoading}
        />
      </Grid>
    </Grid>
  )
}

AdminHome.layout = LayoutAdminPage
export default AdminHome

export { getServerSideProps }
