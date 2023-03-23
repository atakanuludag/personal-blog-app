// ** icons
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import VideocamIcon from '@mui/icons-material/Videocam'
import ImageIcon from '@mui/icons-material/Image'

// ** utils
import { getExtentionByFileName } from '@/utils/MimeTypeNames'

type FileBrowserIconsProps = {
  fileName: string
  fontSize?: 'inherit' | 'large' | 'medium' | 'small'
}
export default function FileBrowserIcons({
  fileName,
  fontSize = 'medium',
}: FileBrowserIconsProps) {
  const ext = getExtentionByFileName(fileName)
  switch (ext.toLowerCase()) {
    case 'mp4':
      return <VideocamIcon fontSize={fontSize} />
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
    case 'tiff':
    case 'bmp':
    case 'eps':
      return <ImageIcon fontSize={fontSize} />
    default:
      return <InsertDriveFileIcon fontSize={fontSize} />
  }
}
