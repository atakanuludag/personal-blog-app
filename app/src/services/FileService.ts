import service from "@/services";
import ListResponseModel from "@/models/ListResponseModel";
import FileModel, { FileListQueryModel, FileForm } from "@/models/FileModel";
import { BaseServiceErrorModel } from "@/models/ServiceBaseModel";
import { EndpointUrls } from "@/config";
import { objectToParams } from "@/utils/params";

//todo: BaseServiceErrorModel her yere eklenecek.

const FileService = {
  getItems: async (
    params?: FileListQueryModel
  ): Promise<ListResponseModel<FileModel[]> | FileModel[]> =>
    service(`${EndpointUrls.file}${objectToParams(params)}`),
  deleteItem: async (id: string): Promise<void | BaseServiceErrorModel> =>
    service(`${EndpointUrls.file}/${id}`, { method: "DELETE" }),
  createFolder: async (title: string, path: string | null): Promise<void> =>
    service(`${EndpointUrls.file}/folder`, {
      method: "POST",
      body: {
        title,
        path: path || "/",
      },
    }),
  uploadFile: async (file: File, path: string | null): Promise<FileModel[]> => {
    try {
      const formData = new FormData();
      // ** Path datası en üstte verilmeli. Yoksa api tarafındaki multer'da sıkıntı çıkartıyor.

      if (path) formData.append("path", path);
      formData.append("file", file);

      const res = await service(`${EndpointUrls.file}`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res || [];
    } catch (err) {
      console.log("[FileService] uploadFile() Error: ", err);
      return [];
    }
  },
  patchItem: async (body: FileForm): Promise<void> =>
    service(`${EndpointUrls.file}/${body._id}`, {
      method: "PATCH",
      body,
    }),
};

Object.freeze(FileService);

export default FileService;
