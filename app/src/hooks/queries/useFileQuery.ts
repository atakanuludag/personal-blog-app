import { useInfiniteQuery, useQuery } from "react-query";
import FileService from "@/services/FileService";
import FileModel, { FileListQueryModel } from "@/models/FileModel";
import ListResponseModel from "@/models/ListResponseModel";
import { QUERY_NAMES } from "@/config";

//todo: tüm query hooksları kontrol edilecek. importlamalara bakılacak

export default function useFileQuery(params?: FileListQueryModel) {
  const service = FileService;
  const queryName = QUERY_NAMES.FILES;

  const useFilesQuery = () =>
    useQuery([queryName, params], () => service.getItems(params));

  // const useFilesInfiniteQuery = () =>
  //   useInfiniteQuery(
  //     [queryName],
  //     ({ pageParam }) =>
  //       service.getItems({
  //         ...params,
  //         page: pageParam,
  //       }) as any,
  //     {
  //       getNextPageParam: (lastPage: ListResponseModel<FileModel[]>) => {
  //         return lastPage.hasNextPage;
  //       },
  //     }
  //   );

  return {
    useFilesQuery,
  };
}
