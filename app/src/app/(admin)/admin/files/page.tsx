// ** mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// ** components
import FileBrowser from "@/components/admin/shared/file-browser";

export default function AdminFiles() {
  return (
    <Box>
      <Grid
        container
        spacing={1}
        display="flex"
        justifyContent="space-between"
        pb={3}
      >
        <Grid item md={9} xs={12} display="flex" alignItems="center">
          <Stack direction="row" spacing={1}>
            <Typography variant="h5" fontWeight={500}>
              Ortam Kütüphanesi
            </Typography>
          </Stack>
        </Grid>

        <Grid item md={3} xs={12} />
      </Grid>
      <Box sx={{ flexGrow: 1 }}>
        <FileBrowser />
      </Box>
    </Box>
  );
}
