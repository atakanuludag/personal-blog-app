// ** next
import { default as NextLink } from "next/link";
import Image from "next/image";

// ** third party
import { formatDistanceToNow } from "date-fns";
import readingTime from "reading-time";

// ** mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { default as MaterialLink } from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

// ** models
import ArticleModel from "@/models/ArticleModel";

// ** utils
import generateFileUrl from "@/utils/GenerateFileUrl";

type ArticleItemProps = {
  data: ArticleModel;
};

function ArticleItem({ data }: ArticleItemProps) {
  let coverImage = null;

  const readingTimeMin = Math.round(readingTime(data.content).minutes);

  if (data.coverImage) {
    coverImage = generateFileUrl(data.coverImage);
  }

  return (
    <Box padding={1} marginBottom={3}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        alignContent="end"
        spacing={1}
      >
        <Grid item>
          {coverImage && (
            <Image src={coverImage} alt={data.title} width="150" height="150" />
          )}
        </Grid>

        <Grid item xs={12} sm>
          <Box component="h3" fontSize="1.275rem" margin={0}>
            <MaterialLink component={NextLink} href={`/${data.guid}`}>
              {data.title}
            </MaterialLink>
          </Box>
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

          <Box component="p" fontSize="0.770rem" margin="5px 0px">
            {data.shortDescription}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ArticleItem;
