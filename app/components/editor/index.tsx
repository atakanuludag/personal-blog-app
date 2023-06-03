// ** third party
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { ListItemNode, ListNode } from '@lexical/list'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { TRANSFORMERS } from '@lexical/markdown'

// ** lexical plugins
//import TreeViewPlugin from '@/components/editor/plugins/TreeViewPlugin'
import ToolbarPlugin from '@/components/editor/plugins/ToolbarPlugin'
import ListMaxIndentLevelPlugin from '@/components/editor/plugins/ListMaxIndentLevelPlugin'
import CodeHighlightPlugin from '@/components/editor/plugins/CodeHighlightPlugin'
import AutoLinkPlugin from '@/components/editor/plugins/AutoLinkPlugin'

// ** lexical theme
import theme from '@/components/editor/LexicalTheme'

// ** mui
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

const EditorWrapperBox = styled(Box)(({ theme }) => ({
  width: '100%',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.palette.grey[theme.palette.mode === 'dark' ? 800 : 400],
  borderRadius: theme.spacing(0.5),
}))

const EditorBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderTopWidth: 1,
  borderTopStyle: 'solid',
  borderTopColor: theme.palette.grey[theme.palette.mode === 'dark' ? 800 : 400],
}))

function Placeholder() {
  return (
    <Box position="absolute" top={13} left={10} color={'grey'} zIndex={-1}>
      Başlamak için bir şeyler yazın...
    </Box>
  )
}

export default function Editor() {
  const editorConfig: InitialConfigType = {
    // The editor theme
    theme,
    namespace: 'editor',
    // Handling of errors during update
    onError(error: Error) {
      throw error
    },
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <EditorWrapperBox>
        <ToolbarPlugin />
        <EditorBox>
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          {/* <TreeViewPlugin /> */}
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </EditorBox>
      </EditorWrapperBox>
    </LexicalComposer>
  )
}
