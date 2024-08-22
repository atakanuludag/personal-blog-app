// ** third party
import { formatDistanceToNow } from "date-fns";

// ** mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// ** models
import PageModel from "@/models/PageModel";

// ** components
import RenderMdx from "@/components/RenderMdx";

type PageDetailProps = {
  data: PageModel;
};

export default function PageDetail({ data }: PageDetailProps) {
  return (
    <Box component="article">
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item>
          <Typography
            component="h2"
            margin={0}
            fontSize="2rem"
            fontWeight="bold"
          >
            {data.title}
          </Typography>
        </Grid>

        <Grid item>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}
            sx={{
              "& span.MuiBox-root": {
                fontSize: "0.770rem",
                color: "grey.600",
              },
            }}
          >
            <Box component="span">
              {formatDistanceToNow(new Date(data.publishingDate), {
                addSuffix: true,
              })}
            </Box>
            <Box component="span">{`${data.viewCount} okunma`}</Box>
          </Stack>
        </Grid>

        <Grid item xs={12} width="100%">
          <RenderMdx content={data.content} />
        </Grid>
      </Grid>
    </Box>
  );
}
