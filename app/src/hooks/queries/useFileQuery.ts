// ** third party
import { useQuery } from "@tanstack/react-query";

// ** services
import FileService from "@/services/FileService";

// ** models
import { FileListQueryModel } from "@/models/FileModel";

// ** config
import { QUERY_NAMES } from "@/config";

export default function useFileQuery(params?: FileListQueryModel) {
  const service = FileService;
  const queryName = QUERY_NAMES.FILES;

  const useFilesQuery = () =>
    useQuery({
      queryKey: [queryName, params],
      queryFn: () => service.getItems(params),
    });

  return {
    useFilesQuery,
  };
}
