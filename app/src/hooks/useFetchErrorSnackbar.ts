// ** third party
import { useSnackbar } from "notistack";

// ** utils
import FetchError from "@/utils/fetchError";

export default function useFetchErrorSnackbar() {
  const { enqueueSnackbar } = useSnackbar();

  return (data: FetchError) => {
    const message = data?.message;
    if (!message) return;

    const isWarningStatus = [400, 401, 402].includes(data.errResponse.status);

    enqueueSnackbar(message, {
      variant: isWarningStatus ? "warning" : "error",
    });
  };
}
