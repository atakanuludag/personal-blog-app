// ** next
import { default as NextLink } from "next/link";

// ** third party
import { formatDistanceToNow } from "date-fns";
import readingTime from "reading-time";

// ** mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

// ** models
import ArticleModel from "@/models/ArticleModel";

// ** components
import LikeButton from "@/components/article/LikeButton";
import RenderMdx from "@/components/RenderMdx";

// ** utils
import generateFileUrl from "@/utils/GenerateFileUrl";
import { PaletteMode } from "@/models/enums";

type ArticleDetailProps = {
  data: ArticleModel;
};

export default function ArticleDetail({ data }: ArticleDetailProps) {
  let coverImage = null;
  const readingTimeMin = Math.round(readingTime(data.content).minutes);

  if (data.coverImage) coverImage = generateFileUrl(data.coverImage);

  return (
    <Box component="article">
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid container item xs={12}>
          <Grid item xs={10}>
            <Typography
              component="h2"
              margin={0}
              fontSize="2rem"
              fontWeight="bold"
            >
              {data.title}
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <LikeButton
              itemId={data._id}
              likedCount={data.likedCount}
              currentIpAdressIsLiked={true}
            />
          </Grid>
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
            <Box component="span">
              {readingTimeMin <= 0
                ? "1 dakikadan az"
                : `${readingTimeMin} dakikalık okuma`}
            </Box>
            <Box component="span">{`${data.viewCount} okunma`}</Box>
            <Box component="span">{`${data.likedCount} beğeni`}</Box>
          </Stack>
        </Grid>

        <Grid item xs={12} width="100%">
          <RenderMdx content={data.content} theme={PaletteMode.DARK} />
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {data.tags.map((tag) => (
              <Chip
                key={tag._id}
                label={tag.title}
                component={NextLink}
                href={`/tag/${tag.guid}`}
                variant="outlined"
                size="small"
                clickable
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
