import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { stateToHTML } from 'draft-js-export-html'
import {
  Editor as DraftJS,
  EditorState,
  RichUtils,
  DraftBlockType,
  DraftInlineStyleType,
} from 'draft-js'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough'

interface IEditorToolbar {
  editorState: EditorState
  setEditorState: Dispatch<SetStateAction<EditorState>>
}

interface IButton {
  label: string
  style: DraftInlineStyleType
  icon: JSX.Element
}
interface ITextStyle {
  label: string
  style: DraftBlockType
}
//https://openbase.com/js/draft-js-wysiwyg
//https://codesandbox.io/s/004kj7m6wp?file=/src/SyntaxHighlighter.js
//https://www.draft-js-plugins.com/plugin/text-alignment
//https://github.com/niuware/mui-rte
const buttons: IButton[] = [
  {
    label: 'Bold',
    style: 'BOLD',
    icon: <FormatBoldIcon />,
  },
  {
    label: 'Italic',
    style: 'ITALIC',
    icon: <FormatItalicIcon />,
  },
  {
    label: 'Underline',
    style: 'UNDERLINE',
    icon: <FormatUnderlinedIcon />,
  },
  {
    label: 'Strike Through',
    style: 'STRIKETHROUGH',
    icon: <FormatStrikethroughIcon />,
  },
]

/*
type CoreDraftBlockType =
                | 'unstyled'
                | 'paragraph'
                | 'header-one'
                | 'header-two'
                | 'header-three'
                | 'header-four'
                | 'header-five'
                | 'header-six'
                | 'unordered-list-item'
                | 'ordered-list-item'
                | 'blockquote'
                | 'code-block'
                | 'atomic';
*/
const textStyle: ITextStyle[] = [
  {
    label: 'Normal',
    style: 'unstyled',
  },
  {
    label: 'H1',
    style: 'paragraph',
  },
]

const ToolbarWrapper = styled(Box)(({ theme }) => ({
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  borderBottomColor: theme.palette.secondary.main,
}))

function EditorToolbar({ editorState, setEditorState }: IEditorToolbar) {
  return (
    <ToolbarWrapper>
      {buttons.map((b, i) => (
        <IconButton
          key={i}
          color="secondary"
          aria-label={b.label}
          component="span"
          onClick={() =>
            setEditorState(RichUtils.toggleInlineStyle(editorState, b.style))
          }
        >
          {b.icon}
        </IconButton>
      ))}
    </ToolbarWrapper>
  )
}

export default EditorToolbar
