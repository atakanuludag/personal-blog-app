"use client";

// ** third party
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// components
import FileBrowser, {
  FileBrowserProps,
} from "@/components/admin/shared/file-browser/FileBrowser";

export type { FileBrowserProps };

export default function FileBrowserWrapper(props: FileBrowserProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <FileBrowser {...props} />
    </DndProvider>
  );
}
