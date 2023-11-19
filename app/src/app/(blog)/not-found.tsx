"use client";

// ** react
import { Fragment } from "react";

// ** next
import { default as NextLink } from "next/link";
import { Metadata } from "next";

// ** mui
import { default as MaterialLink } from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// ** components
import SearchInput from "@/components/SearchInput";

export const metadata: Metadata = {
  title: "404 Sayfa Bulunamadı",
  robots: {
    follow: false,
    index: false,
  },
};

export default function NotFoundPage() {
  return (
    <Fragment>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignContent="center"
        spacing={3}
      >
        <Grid item>
          <Typography align="center" variant="h1" letterSpacing={2}>
            404
          </Typography>
        </Grid>

        <Grid item>
          <Typography align="center" variant="h4">
            Sayfa Bulunamadı 😔
          </Typography>
        </Grid>

        <Grid item>
          <Typography align="center" variant="body2" component="span">
            <MaterialLink component={NextLink} href="/" color="secondary">
              Buraya
            </MaterialLink>{" "}
            tıklayarak ana sayfaya dönebilir veya aşağıdan arama yapabilirsiniz.
          </Typography>
        </Grid>

        <Grid item>
          <SearchInput fullWidth />
        </Grid>
      </Grid>
    </Fragment>
  );
}
