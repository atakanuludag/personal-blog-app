// ** third party
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

// ** mui
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

// ** icons
import CachedIcon from "@mui/icons-material/Cached";

// ** services
import NextService from "@/services/NextService";

// ** hooks
import useFetchErrorSnackbar from "@/hooks/useFetchErrorSnackbar";

// ** utils
import FetchError from "@/utils/fetchError";

type DataGridCacheClearColumnProps = {
  readonly path: string;
  readonly title: string;
};

export default function DataGridCacheClearColumn({
  path,
  title,
}: DataGridCacheClearColumnProps) {
  const fetchErrorSnackbar = useFetchErrorSnackbar();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: cacheClear, isPending: isCacheClearLoading } = useMutation({
    mutationFn: () => NextService.cacheClear({ path }),
    onMutate: () => enqueueSnackbar(`Önbellek siliniyor...`),
    mutationKey: ["cacheClear", path],
    onSuccess: () => {
      enqueueSnackbar(`${title} statik adresin önbelleği silindi.`);
    },
    onError: (err: FetchError) => {
      fetchErrorSnackbar(err as FetchError);
    },
  });

  return (
    <Tooltip title="Önbellek Sil">
      <IconButton size="small" onClick={() => cacheClear()}>
        {isCacheClearLoading ? (
          <CircularProgress size={15} />
        ) : (
          <CachedIcon sx={{ fontSize: "15px" }} />
        )}
      </IconButton>
    </Tooltip>
  );
}
