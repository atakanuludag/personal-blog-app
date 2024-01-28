// ** service
import service from "@/services";

// ** models
import ListResponseModel from "@/models/ListResponseModel";
import FileModel, { FileListQueryModel, FileForm } from "@/models/FileModel";
// ** utils
import { objectToParams } from "@/utils/params";

// ** config
import { EndpointUrls } from "@/config";

const FileService = {
  getItems: async (params?: FileListQueryModel) =>
    service<ListResponseModel<FileModel[]> | FileModel[]>(
      `${EndpointUrls.file}${objectToParams(params)}`
    ),
  deleteItem: async (id: string) =>
    service(`${EndpointUrls.file}/${id}`, { method: "DELETE" }),
  createFolder: async (title: string, path: string | null) =>
    service<FileModel>(`${EndpointUrls.file}/folder`, {
      method: "POST",
      body: {
        title,
        path: path || "/",
      },
    }),
  uploadFile: async (file: File, path: string | null) => {
    const formData = new FormData();
    // ** Path datası en üstte verilmeli. Yoksa api tarafındaki multer'da sıkıntı çıkartıyor.

    if (path) formData.append("path", path);
    formData.append("file", file);

    const res = await service<FileModel[]>(`${EndpointUrls.file}`, {
      method: "POST",
      body: formData,
      isFormData: true,
    });
    return res?.data ?? [];
  },
  patchItem: async (body: FileForm) =>
    service<FileModel>(`${EndpointUrls.file}/${body._id}`, {
      method: "PATCH",
      body,
    }),
};

Object.freeze(FileService);

export default FileService;
