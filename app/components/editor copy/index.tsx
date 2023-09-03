// // ** third party
// import {
//   InitialConfigType,
//   LexicalComposer,
// } from '@lexical/react/LexicalComposer'
// import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
// import { ContentEditable } from '@lexical/react/LexicalContentEditable'
// import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
// import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
// import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
// import { HeadingNode, QuoteNode } from '@lexical/rich-text'
// import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
// import { ListItemNode, ListNode } from '@lexical/list'
// import { CodeHighlightNode, CodeNode } from '@lexical/code'
// import { AutoLinkNode, LinkNode } from '@lexical/link'
// import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'

// import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
// import { ListPlugin } from '@lexical/react/LexicalListPlugin'
// import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
// import { TRANSFORMERS } from '@lexical/markdown'

// import Toolbar from '@/components/editor/Toolbar'

// // ** lexical plugins
// //import TreeViewPlugin from '@/components/editor/plugins/TreeViewPlugin'
// import ListMaxIndentLevelPlugin from '@/components/editor/plugins/ListMaxIndentLevelPlugin'
// import CodeHighlightPlugin from '@/components/editor/plugins/CodeHighlightPlugin'
// import AutoLinkPlugin from '@/components/editor/plugins/AutoLinkPlugin'
// import ImagePlugin from '@/components/editor/plugins/ImagePlugin'

// import { ImageNode } from '@/components/editor/nodes/ImageNode'

// // ** lexical theme
// import theme from '@/components/editor/LexicalTheme'

// // ** mui
// import { styled } from '@mui/material/styles'
// import Box from '@mui/material/Box'
// import { EditorState } from 'lexical/LexicalEditorState'
// import { $getRoot, $getSelection } from 'lexical'
// import { useRef } from 'react'

// const EditorWrapperBox = styled(Box)(({ theme }) => ({
//   width: '100%',
//   borderWidth: 1,
//   borderStyle: 'solid',
//   borderColor: theme.palette.grey[theme.palette.mode === 'dark' ? 800 : 400],
//   borderRadius: theme.spacing(0.5),
// }))

// const EditorBox = styled(Box)(({ theme }) => ({
//   position: 'relative',
//   borderTopWidth: 1,
//   borderTopStyle: 'solid',
//   borderTopColor: theme.palette.grey[theme.palette.mode === 'dark' ? 800 : 400],
// }))

// function Placeholder() {
//   return (
//     <Box position="absolute" top={13} left={10} color={'grey'} zIndex={-1}>
//       Başlamak için bir şeyler yazın...
//     </Box>
//   )
// }

// type EditorProps = {
//   readingPage?: boolean
//   content?: any //todo
// }

// export default function Editor({ readingPage = false, content }: EditorProps) {
//   const editorStateRef = useRef<EditorState>()
//   console.log('content', content)
//   const editorConfig = {
//     // The editor theme
//     theme,
//     namespace: 'editor',
//     readOnly: readingPage, // bu aq yerini ekleyince patlıyor. serivsten gelenen stateti basamıyorum: http://localhost:3000/makale-3
//     editorState: content,
//     // Handling of errors during update
//     onError(error: Error) {
//       throw error
//     },
//     // Any custom nodes go here
//     nodes: [
//       HeadingNode,
//       ListNode,
//       ListItemNode,
//       QuoteNode,
//       CodeNode,
//       CodeHighlightNode,
//       TableNode,
//       TableCellNode,
//       TableRowNode,
//       AutoLinkNode,
//       LinkNode,
//       ImageNode,
//     ],
//   }

//   function onChange(editorState: EditorState) {
//     editorState.read(() => {
//       const json = editorState.toJSON()
//       // console.log(json)
//       // console.log(JSON.stringify(json))
//       //console.log(root, selection)
//     })
//   }

//   return (
//     <LexicalComposer initialConfig={editorConfig}>
//       <EditorWrapperBox className="editor-shell">
//         <Toolbar />
//         <EditorBox>
//           <RichTextPlugin
//             contentEditable={<ContentEditable className="editor-input" />}
//             placeholder={<Placeholder />}
//             ErrorBoundary={LexicalErrorBoundary}
//           />
//           <HistoryPlugin />
//           {/* <TreeViewPlugin /> */}
//           {/* <OnChangePlugin onChange={onChange} /> */}
//           <OnChangePlugin
//             onChange={(editorState) => (editorStateRef.current = editorState)}
//           />
//           <AutoFocusPlugin />
//           <CodeHighlightPlugin />
//           <ListPlugin />
//           <LinkPlugin />
//           <AutoLinkPlugin />
//           <ListMaxIndentLevelPlugin maxDepth={7} />
//           <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
//           <ImagePlugin />
//         </EditorBox>
//       </EditorWrapperBox>
//     </LexicalComposer>
//   )
// }

import { commands } from '@uiw/react-md-editor'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const MDEditor = dynamic(
  () =>
    import('@uiw/react-md-editor').then((mod) => {
      return mod.default
    }),
  { ssr: false },
)

export default function Editor() {
  const [value, setValue] = useState('**Hello world!!!**')
  console.log('value', encodeURI(value))
  return (
    <MDEditor
      value={value}
      onChange={(val) => setValue(val || '')}
      commands={[commands.codeEdit, commands.codePreview]}
    />
  )
}
