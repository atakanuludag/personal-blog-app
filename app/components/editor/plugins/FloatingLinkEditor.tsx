// ** react
import { useCallback, useEffect, useRef, useState } from 'react'

// ** next
import { default as NextLink } from 'next/link'

// ** third party
import {
  $getSelection,
  $isRangeSelection,
  ElementNode,
  LexicalEditor,
  RangeSelection,
  SELECTION_CHANGE_COMMAND,
  TextNode,
} from 'lexical'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { mergeRegister } from '@lexical/utils'

// ** mui
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'

// ** icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EditIcon from '@mui/icons-material/Edit'

type FloatingLinkEditorProps = {
  editor: LexicalEditor
  getSelectedNode: (selection: RangeSelection) => TextNode | ElementNode
}

const LowPriority = 1

export default function FloatingLinkEditor({
  editor,
  getSelectedNode,
}: FloatingLinkEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [linkUrl, setLinkUrl] = useState('')
  const [isEditMode, setEditMode] = useState(false)

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL())
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL())
      } else {
        setLinkUrl('')
      }
    }

    // const editorElem = editorRef.current
    // const nativeSelection: any = window.getSelection()
    // const activeElement = document.activeElement

    // if (editorElem === null) {
    //   return
    // }

    // const rootElement = editor.getRootElement()
    // if (
    //   selection !== null &&
    //   !nativeSelection.isCollapsed &&
    //   rootElement !== null &&
    //   rootElement.contains(nativeSelection.anchorNode)
    // ) {
    //   const domRange = nativeSelection.getRangeAt(0)
    //   let rect
    //   if (nativeSelection.anchorNode === rootElement) {
    //     let inner: Element = rootElement
    //     while (inner.firstElementChild != null) {
    //       inner = inner.firstElementChild
    //     }
    //     rect = inner.getBoundingClientRect()
    //   } else {
    //     rect = domRange.getBoundingClientRect()
    //   }

    //   if (!mouseDownRef.current) {
    //     positionEditorElement(editorElem, rect)
    //   }
    //   setLastSelection(selection as any)
    // } else if (!activeElement || activeElement.className !== 'link-input') {
    //   positionEditorElement(editorElem, null)
    //   setLastSelection(null)
    //   setEditMode(false)
    //   setLinkUrl('')
    // }

    return true
  }, [editor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }: any) => {
        editorState.read(() => {
          updateLinkEditor()
        })
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor()
          return true
        },
        LowPriority,
      ),
    )
  }, [editor, updateLinkEditor])

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor()
    })
  }, [editor, updateLinkEditor])

  useEffect(() => {
    if (isEditMode && inputRef.current) inputRef.current.focus()
  }, [isEditMode])

  const handleLinkSave = () => {
    if (linkUrl !== '') {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl)
    }
    setEditMode(false)
  }

  return (
    <Box padding={1}>
      {isEditMode ? (
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel htmlFor="link-input">Link</InputLabel>
          <OutlinedInput
            fullWidth
            inputRef={inputRef}
            className="link-input"
            size="small"
            id="link-input"
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleLinkSave()
              } else if (e.key === 'Escape') {
                e.preventDefault()
                setEditMode(false)
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" size="small" onClick={handleLinkSave}>
                  <CheckCircleIcon fontSize="inherit" />
                </IconButton>
              </InputAdornment>
            }
            label="Link"
          />
        </FormControl>
      ) : (
        <Stack spacing={1} direction="row" display="flex" alignItems="center">
          <Link
            component={NextLink}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkUrl}
          </Link>

          <IconButton
            edge="end"
            size="small"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setEditMode(true)}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      )}
    </Box>
  )
}
