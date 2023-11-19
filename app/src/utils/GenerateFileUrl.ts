// ** models
import FileModel from "@/models/FileModel";

// ** config
import { UPLOAD_PATH_URL } from "@/config";

const generateFileUrl = (file: FileModel) =>
  `${UPLOAD_PATH_URL}/${file.path ? `${file.path}/` : ""}${file.filename}`;

export default generateFileUrl;
