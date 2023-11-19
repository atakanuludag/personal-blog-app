"use client";

// ** icons
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import VideocamIcon from "@mui/icons-material/Videocam";
import ImageIcon from "@mui/icons-material/Image";
import ArticleIcon from "@mui/icons-material/Article";

// ** utils
import { getExtentionByFileName } from "@/utils/MimeTypeNames";

type FileBrowserIconsProps = {
  fileName: string;
  fontSize?: "inherit" | "large" | "medium" | "small";
};
export default function FileBrowserIcons({
  fileName,
  fontSize = "medium",
}: FileBrowserIconsProps) {
  const ext = getExtentionByFileName(fileName);
  switch (ext.toLowerCase()) {
    case "mp4":
    case "mov":
    case "flv":
    case "m3u8":
    case "ts":
    case "3gp":
    case "avi":
    case "wmv":
    case "mpeg":
    case "ogv":
    case "m4u":
    case "webm":
    case "mkv":
      return <VideocamIcon fontSize={fontSize} />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "svg":
    case "tiff":
    case "bmp":
    case "eps":
      return <ImageIcon fontSize={fontSize} />;
    case "pdf":
    case "xlsx":
    case "xls":
    case "doc":
    case "docx":
      return <ArticleIcon fontSize={fontSize} />;
    default:
      return <InsertDriveFileIcon fontSize={fontSize} />;
  }
}
