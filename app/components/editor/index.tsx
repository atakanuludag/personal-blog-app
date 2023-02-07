import { CSSProperties, useState } from 'react'
import { stateToHTML } from 'draft-js-export-html'
import {
  ContentBlock,
  EditorState,
  convertToRaw,
  CharacterMetadata,
} from 'draft-js'
// import { Editor as DraftEditor } from 'react-draft-wysiwyg'

import DraftEditor from '@draft-js-plugins/editor'

import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  blueGrey,
} from '@mui/material/colors'

import EditorToolbar from '@/components/editor/toolbar'
import FormatBoldIcon from '@mui/icons-material/FormatBold'

const EditorWrapper = styled(Box)(({ theme }) => ({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.palette.secondary.main,
}))

const colors = [
  red[500],
  pink[500],
  purple[500],
  deepPurple[500],
  indigo[500],
  blue[500],
  lightBlue[500],
  cyan[500],
  teal[500],
  green[500],
  lightGreen[500],
  lime[500],
  yellow[500],
  amber[500],
  orange[500],
  deepOrange[500],
  brown[500],
  blueGrey[500],
]

function Editor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const html = stateToHTML(editorState.getCurrentContent(), {
    inlineStyles: {
      [`fontColor-${red[500]}`]: { style: { color: red[500] } },
    },
  })

  let fontColorsMap: any = {}
  colors.forEach((val) => (fontColorsMap[`fontColor-${val}`] = { color: val }))

  let bgColorsMap: any = {}
  colors.forEach(
    (val) => (bgColorsMap[`bgColor-${val}`] = { backgroundColor: val }),
  )

  const editorColors = Object.assign(fontColorsMap, bgColorsMap)

  type GenericObject = { [key: string]: CSSProperties }
  let styleMap: GenericObject = {
    ...editorColors,
    ALIGN_CENTER: {
      display: 'flex',
      justifyContent: 'center',
    },
    ALIGN_LEFT: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
    ALIGN_RIGHT: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }

  // const blockStyleFn = (contentBlock: any) => {
  //   const type = contentBlock.getType()
  //   if (type === 'test') {
  //     contentBlock.findStyleRanges((e: any) => {
  //       console.log('e', e)
  //       // if (e.hasStyle('center')) {
  //       //   alignment = 'center';
  //       // }
  //       // if (e.hasStyle('right')) {
  //       //   alignment = 'right';
  //       // }
  //     })

  //     return 'superFancyBlockquote'
  //   }

  //   return ''
  // }

  console.log('styleMap', styleMap)

  return (
    <EditorWrapper>
      <EditorToolbar
        editorState={editorState}
        setEditorState={setEditorState}
      />
      <DraftEditor
        customStyleMap={styleMap}
        editorState={editorState}
        onChange={setEditorState}
        // blockStyleFn={blockStyleFn}
        // onEditorStateChange={setEditorState}
        // toolbarHidden
        // toolbar={{
        //   inline: {
        //     bold: {
        //       icon: <FormatBoldIcon color="primary" />,
        //       className: undefined,
        //     },
        //   },
        // }}
      />
    </EditorWrapper>
  )
}

export default Editor
