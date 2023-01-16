import { useState } from 'react'
import { stateToHTML } from 'draft-js-export-html'
import { EditorState } from 'draft-js'
import { Editor as DraftEditor } from 'react-draft-wysiwyg'

import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import EditorToolbar from '@/components/editor/toolbar'
import FormatBoldIcon from '@mui/icons-material/FormatBold'

const EditorWrapper = styled(Box)(({ theme }) => ({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.palette.secondary.main,
}))

function Editor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const html = stateToHTML(editorState.getCurrentContent())

  return (
    <EditorWrapper>
      {/* <EditorToolbar
        editorState={editorState}
        setEditorState={setEditorState}
      /> */}
      <DraftEditor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          inline: {
            bold: {
              icon: <FormatBoldIcon color="error" />,
              className: undefined,
            },
          },
        }}
      />
    </EditorWrapper>
  )
}

export default Editor
