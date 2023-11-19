"use client";

// ** mui
import Grid from "@mui/material/Grid";

// ** icons
import ArticleIcon from "@mui/icons-material/Article";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FilePresentIcon from "@mui/icons-material/FilePresent";

// ** components
import DashboardNumberItem from "@/components/admin/dashboard/DashboardNumberItem";

// ** hooks
import useAdminDashboardReport from "@/hooks/queries/useAdminDashboardReport";

export default function AdminIndex() {
  const { useAdminDashboardReportQuery } = useAdminDashboardReport();
  const { data, isLoading } = useAdminDashboardReportQuery();

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
  );
}
