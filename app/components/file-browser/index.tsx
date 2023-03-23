// ** third party
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// components
import FileBrowser, {
  FileBrowserProps,
} from '@/components/file-browser/FileBrowser'

export default function FileBrowserWrapper(props: FileBrowserProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <FileBrowser {...props} />
    </DndProvider>
  )
}
