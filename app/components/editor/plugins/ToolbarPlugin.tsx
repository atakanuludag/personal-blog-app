// ** react
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  MouseEvent,
} from 'react'

// ** third party
import { CirclePicker } from 'react-color'
import { EmojiClickData } from 'emoji-picker-react'
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $isElementNode,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $createNodeSelection,
  $getNodeByKey,
  RangeSelection,
  $insertNodes,
  $createTextNode,
  $getRoot,
  $isParagraphNode,
} from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'

import {
  $isParentElementRTL,
  $wrapNodes,
  $isAtNodeEnd,
  $patchStyleText,
  $getSelectionStyleValueForProperty,
} from '@lexical/selection'
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils'
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from '@lexical/list'
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from '@lexical/rich-text'
import {
  $createCodeNode,
  $isCodeNode,
  getDefaultCodeLanguage,
  getCodeLanguages,
} from '@lexical/code'

// ** mui
import { useTheme, styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import {
  default as MaterialSelect,
  SelectChangeEvent,
} from '@mui/material/Select'

// ** icons
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'
import CodeIcon from '@mui/icons-material/Code'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import LinkIcon from '@mui/icons-material/Link'
import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'
import Button from '@mui/material/Button'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import EditIcon from '@mui/icons-material/Edit'

// ** components
import EmojiPicker from '@/components/EmojiPicker'
import FloatingLinkEditor from '@/components/editor/plugins/FloatingLinkEditor'

// ** hooks
import useComponentContext from '@/hooks/useComponentContext'
import Badge from '@mui/material/Badge'

const ToggleButtonStyled = styled(ToggleButton)(({ theme }) => ({
  width: 41,
  height: 41,
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
}))

const ToolbarWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(0.7),
}))

const LowPriority = 1

const supportedBlockTypes = new Set([
  'paragraph',
  'quote',
  'code',
  'h1',
  'h2',
  'ul',
  'ol',
])

function getSelectedNode(selection: RangeSelection) {
  const anchor = selection.anchor
  const focus = selection.focus
  const anchorNode = selection.anchor.getNode()
  const focusNode = selection.focus.getNode()
  if (anchorNode === focusNode) {
    return anchorNode
  }
  const isBackward = selection.isBackward()
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode
  }
}

function BlockOptionsDropdownList({ editor, blockType }: any) {
  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode())
        }
      })
    }
  }

  const formatLargeHeading = () => {
    if (blockType !== 'h1') {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode('h1'))
        }
      })
    }
  }

  const formatSmallHeading = () => {
    if (blockType !== 'h2') {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode('h2'))
        }
      })
    }
  }

  const formatBulletList = () => {
    if (blockType !== 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND)
    }
  }

  const formatNumberedList = () => {
    if (blockType !== 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND)
    }
  }

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode())
        }
      })
    }
  }

  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createCodeNode())
        }
      })
    }
  }

  return (
    <Box>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <MaterialSelect displayEmpty value={blockType}>
          <MenuItem value={'paragraph'} onClick={() => formatParagraph()}>
            Normal
          </MenuItem>
          <MenuItem value={'h1'} onClick={() => formatLargeHeading()}>
            Large Heading
          </MenuItem>
          <MenuItem value={'h2'} onClick={() => formatSmallHeading()}>
            Small Heading
          </MenuItem>
          <MenuItem value={'ul'} onClick={() => formatBulletList()}>
            Bullet List
          </MenuItem>
          <MenuItem value={'ol'} onClick={() => formatNumberedList()}>
            Numbered List
          </MenuItem>
          <MenuItem value={'quote'} onClick={() => formatQuote()}>
            Quote
          </MenuItem>
          <MenuItem value={'code'} onClick={() => formatCode()}>
            Code Block
          </MenuItem>
        </MaterialSelect>
      </FormControl>
    </Box>
  )
}

export default function ToolbarPlugin() {
  const theme = useTheme()
  const { setPopoverData, handlePopoverClose } = useComponentContext()
  const [editorSelectElemDOM, setEditorSelectElemDOM] =
    useState<HTMLElement | null>(null)

  const [linkPopoverAnchorEl, setLinkPopoverAnchorEl] =
    useState<HTMLElement | null>(null)
  const linkPopoverOpen = Boolean(linkPopoverAnchorEl)
  const handleLinkPopoverClose = () => setLinkPopoverAnchorEl(null)

  const [editor] = useLexicalComposerContext()

  const toolbarRef = useRef(null)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [blockType, setBlockType] = useState('paragraph')
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(
    null,
  )
  const [formatType, setFormatType] = useState('')
  const [codeLanguage, setCodeLanguage] = useState('')
  const [isRTL, setIsRTL] = useState(false)
  const [isLink, setIsLink] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [isCode, setIsCode] = useState(false)
  const [fontColor, setFontColor] = useState<string | undefined>(undefined)
  const [fontBgColor, setFontBgColor] = useState<string | undefined>(undefined)

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow()
      const elementKey = element.getKey()
      const elementDOM = editor.getElementByKey(elementKey)

      if (elementDOM !== null) {
        setEditorSelectElemDOM(elementDOM)
        setSelectedElementKey(elementKey)
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode)

          const type = parentList ? parentList.getTag() : element.getTag()
          setBlockType(type)
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType()

          setBlockType(type)
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage())
          }
        }
      }
      const elemFormatType = element.getFormatType()

      // Update text format
      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
      setIsUnderline(selection.hasFormat('underline'))
      setIsStrikethrough(selection.hasFormat('strikethrough'))
      setIsCode(selection.hasFormat('code'))
      setIsRTL($isParentElementRTL(selection))
      setFormatType(elemFormatType)

      // Update links
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true)
      } else {
        setIsLink(false)
      }

      setFontColor(
        $getSelectionStyleValueForProperty(selection, 'color', undefined),
      )
      setFontBgColor(
        $getSelectionStyleValueForProperty(
          selection,
          'background-color',
          undefined,
        ),
      )
    }
  }, [editor])

  console.log('fontColor', fontColor)

  const applyStyleText = useCallback(
    (styles: Record<string, string>) => {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, styles)
        }
      })
    },
    [editor],
  )

  const onFontColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ color: value })
    },
    [applyStyleText],
  )
  const onBgColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ 'background-color': value })
    },
    [applyStyleText],
  )

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar()
          return false
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)
          return false
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        LowPriority,
      ),
    )
  }, [editor, updateToolbar])

  useEffect(() => {
    if (isLink) setLinkPopoverAnchorEl(editorSelectElemDOM)
  }, [isLink])

  const codeLanguges = useMemo(() => getCodeLanguages(), [])
  const onCodeLanguageSelect = useCallback(
    (e: SelectChangeEvent<string>) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey)
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value)
          }
        }
      })
    },
    [editor, selectedElementKey],
  )

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://')
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
    setLinkPopoverAnchorEl(editorSelectElemDOM)
  }, [editor, isLink, editorSelectElemDOM])

  const handleEmojiButtonClick = (e: MouseEvent<HTMLElement>) => {
    setPopoverData({
      open: true,
      anchorEl: e.currentTarget,
      content: (
        <EmojiPicker
          onClick={(data: EmojiClickData) => {
            editor.update(() => {
              const selection = $getSelection()
              if (selection) selection.insertText(data.emoji)
            })
          }}
        />
      ),
    })
  }

  const handleBgColorButtonClick = (e: MouseEvent<HTMLElement>) => {
    setPopoverData({
      open: true,
      anchorEl: e.currentTarget,
      content: (
        <Box padding={2}>
          <CirclePicker
            color={''}
            onChange={(color) => onBgColorSelect(color.hex)}
            circleSpacing={10}
            circleSize={30}
            styles={{
              default: {
                card: {
                  display: 'flex',
                  justifyContent: 'center',
                },
              },
            }}
          />
        </Box>
      ),
    })
  }

  const handleFontColorButtonClick = (e: MouseEvent<HTMLElement>) => {
    setPopoverData({
      open: true,
      anchorEl: e.currentTarget,
      content: (
        <Box padding={2}>
          <CirclePicker
            color={''}
            onChange={(color) => onFontColorSelect(color.hex)}
            circleSpacing={10}
            circleSize={30}
            styles={{
              default: {
                card: {
                  display: 'flex',
                  justifyContent: 'center',
                },
              },
            }}
          />
        </Box>
      ),
    })
  }

  return (
    <ToolbarWrapper spacing={1} direction="row" display="flex" ref={toolbarRef}>
      <ToggleButtonGroup>
        <ToggleButtonStyled
          value={UNDO_COMMAND}
          onClick={(e, value) => editor.dispatchCommand(value, undefined)}
        >
          <UndoIcon />
        </ToggleButtonStyled>

        <ToggleButtonStyled
          value={REDO_COMMAND}
          onClick={(e, value) => editor.dispatchCommand(value, undefined)}
        >
          <RedoIcon />
        </ToggleButtonStyled>
      </ToggleButtonGroup>

      {supportedBlockTypes.has(blockType) && (
        <BlockOptionsDropdownList editor={editor} blockType={blockType} />
      )}
      {blockType === 'code' ? (
        <Box>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <MaterialSelect
              displayEmpty
              value={codeLanguage}
              onChange={onCodeLanguageSelect}
            >
              {codeLanguges.map((codeLanguage, index) => (
                <MenuItem key={index} value={codeLanguage}>
                  {codeLanguage}
                </MenuItem>
              ))}
            </MaterialSelect>
          </FormControl>
        </Box>
      ) : (
        <>
          <ToggleButtonGroup>
            <ToggleButtonStyled
              value="bold"
              onClick={(e, value) =>
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, value)
              }
              selected={isBold}
            >
              <FormatBoldIcon />
            </ToggleButtonStyled>
            <ToggleButtonStyled
              value="italic"
              onClick={(e, value) =>
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, value)
              }
              selected={isItalic}
            >
              <FormatItalicIcon />
            </ToggleButtonStyled>
            <ToggleButtonStyled
              value="underline"
              onClick={(e, value) =>
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, value)
              }
              selected={isUnderline}
            >
              <FormatUnderlinedIcon />
            </ToggleButtonStyled>
            <ToggleButtonStyled
              value="strikethrough"
              onClick={(e, value) =>
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, value)
              }
              selected={isStrikethrough}
            >
              <FormatStrikethroughIcon />
            </ToggleButtonStyled>

            <ToggleButtonStyled value="" onClick={handleFontColorButtonClick}>
              <Badge
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: fontColor,
                  },
                }}
                variant="dot"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                invisible={!fontColor ? true : false}
              >
                <FormatColorTextIcon />
              </Badge>
            </ToggleButtonStyled>

            <ToggleButtonStyled value="" onClick={handleBgColorButtonClick}>
              <Badge
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: fontBgColor,
                  },
                }}
                variant="dot"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                invisible={!fontBgColor ? true : false}
              >
                <FormatColorFillIcon />
              </Badge>
            </ToggleButtonStyled>

            <ToggleButtonStyled
              value="code"
              onClick={(e, value) =>
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, value)
              }
              selected={isCode}
            >
              <CodeIcon />
            </ToggleButtonStyled>

            <ToggleButtonStyled
              value="link"
              onClick={insertLink}
              selected={isLink}
            >
              <LinkIcon />
            </ToggleButtonStyled>

            <ToggleButtonStyled
              value=""
              size="small"
              onClick={(e) => handleEmojiButtonClick(e)}
            >
              <EmojiEmotionsIcon />
            </ToggleButtonStyled>
          </ToggleButtonGroup>

          <ToggleButtonGroup>
            <ToggleButtonStyled
              value="left"
              onClick={(e, value) =>
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value)
              }
              selected={formatType === 'left'}
            >
              <FormatAlignLeftIcon />
            </ToggleButtonStyled>

            <ToggleButtonStyled
              value="center"
              onClick={(e, value) =>
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value)
              }
              selected={formatType === 'center'}
            >
              <FormatAlignCenterIcon />
            </ToggleButtonStyled>

            <ToggleButtonStyled
              value="right"
              onClick={(e, value) =>
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value)
              }
              selected={formatType === 'right'}
            >
              <FormatAlignRightIcon />
            </ToggleButtonStyled>

            <ToggleButtonStyled
              value="justify"
              onClick={(e, value) =>
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value)
              }
              selected={formatType === 'justify'}
            >
              <FormatAlignJustifyIcon />
            </ToggleButtonStyled>
          </ToggleButtonGroup>
        </>
      )}

      <Popover
        open={linkPopoverOpen}
        anchorEl={linkPopoverAnchorEl}
        onClose={handleLinkPopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <FloatingLinkEditor editor={editor} getSelectedNode={getSelectedNode} />
      </Popover>
    </ToolbarWrapper>
  )
}
