"use client";

// ** mui
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

const SkeletonLoading = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <Stack spacing={2}>
          <Skeleton variant="rectangular" height={40} />
          <Skeleton variant="rectangular" height={40} />
          <Skeleton variant="rectangular" height={40} />
          <Skeleton variant="rectangular" height={550} />
        </Stack>
      </Grid>

      <Grid item xs={3}>
        <Stack spacing={2}>
          <Skeleton variant="rectangular" height={153} />
          <Skeleton variant="rectangular" height={170} />
          <Skeleton variant="rectangular" height={153} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SkeletonLoading;
