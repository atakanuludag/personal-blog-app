// ** react
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  MouseEvent,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from 'react'

// ** third party
import { CirclePicker } from 'react-color'
import { EmojiClickData } from 'emoji-picker-react'

// ** mui
import { useTheme, styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'
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
import FormatClearIcon from '@mui/icons-material/FormatClear'
import ImageIcon from '@mui/icons-material/Image'

// ** components
import EmojiPicker from '@/components/EmojiPicker'
import FileBrowser from '@/components/file-browser'

// ** hooks
import useComponentContext from '@/hooks/useComponentContext'
import Badge from '@mui/material/Badge'
import FileModel from '@/models/FileModel'

import { UPLOAD_PATH_URL } from '@/config'

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

{
  /* <Box>
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
</Box> */
}

type ToolbarProps = {
  textAreaRef: MutableRefObject<HTMLTextAreaElement | null>
  editorValue: string
  setEditorValue: Dispatch<SetStateAction<string>>
}

export default function ToolbarPlugin({
  textAreaRef,
  editorValue,
  setEditorValue,
}: ToolbarProps) {
  const theme = useTheme()
  const {
    setPopoverData,
    handlePopoverClose,
    setConfirmDialogData,
    handleConfirmDialogClose,
  } = useComponentContext()
  const [editorSelectElemDOM, setEditorSelectElemDOM] =
    useState<HTMLElement | null>(null)

  const [linkPopoverAnchorEl, setLinkPopoverAnchorEl] =
    useState<HTMLElement | null>(null)
  const linkPopoverOpen = Boolean(linkPopoverAnchorEl)
  const handleLinkPopoverClose = () => setLinkPopoverAnchorEl(null)

  const [selectedImageFiles, setSelectedImageFiles] = useState(
    new Array<FileModel>(),
  )

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

  //   const applyStyleText = useCallback(
  //     (styles: Record<string, string>) => {
  //       editor.update(() => {
  //         const selection = $getSelection()
  //         if ($isRangeSelection(selection)) {
  //           $patchStyleText(selection, styles)
  //         }
  //       })
  //     },
  //     [editor],
  //   )

  const handleEmojiButtonClick = (e: MouseEvent<HTMLElement>) => {
    setPopoverData({
      open: true,
      anchorEl: e.currentTarget,
      content: (
        <EmojiPicker
          onClick={(data: EmojiClickData) => {
            // editor.update(() => {
            //   const selection = $getSelection()
            //   if (selection) selection.insertText(data.emoji)
            // })
          }}
        />
      ),
    })
  }

  //   const handleBgColorButtonClick = (e: MouseEvent<HTMLElement>) => {
  //     setPopoverData({
  //       open: true,
  //       anchorEl: e.currentTarget,
  //       content: (
  //         <Box padding={2}>
  //           <CirclePicker
  //             color={''}
  //             onChange={(color) => onBgColorSelect(color.hex)}
  //             circleSpacing={10}
  //             circleSize={30}
  //             styles={{
  //               default: {
  //                 card: {
  //                   display: 'flex',
  //                   justifyContent: 'center',
  //                 },
  //               },
  //             }}
  //           />
  //         </Box>
  //       ),
  //     })
  //   }

  //   const handleSelectImageFilesChange = (data: FileModel[]) => {
  //     data.forEach((item) => {
  //       editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
  //         src: `${UPLOAD_PATH_URL}/${item.path ? `${item.path}/` : ''}${
  //           item.filename
  //         }`,
  //         altText: '',
  //       })
  //     })

  //     setSelectedImageFiles(data)
  //   }

  //   const handleClickOpenFileBrowser = (type: 'image') => {
  //     setConfirmDialogData({
  //       open: true,
  //       title: 'Resim Seç',
  //       content: (
  //         <FileBrowser
  //           enableSelectedFiles
  //           selectedFiles={selectedImageFiles}
  //           handleSelectFilesChange={handleSelectImageFilesChange}
  //         />
  //       ),
  //       handleConfirmFunction: () => {},
  //       maxWidth: 'xl',
  //     })
  //   }

  return (
    <ToolbarWrapper spacing={1} direction="row" display="flex" ref={toolbarRef}>
      <ToggleButtonGroup>
        <ToggleButtonStyled
          value={''}
          //   onClick={(e, value) => editor.dispatchCommand(value, undefined)}
        >
          <UndoIcon />
        </ToggleButtonStyled>

        <ToggleButtonStyled value={''}>
          <RedoIcon />
        </ToggleButtonStyled>
      </ToggleButtonGroup>

      {/* {supportedBlockTypes.has(blockType) && (
        <BlockOptionsDropdownList editor={editor} blockType={blockType} />
      )} */}

      {blockType === 'code' ? (
        <Box>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <MaterialSelect
              displayEmpty
              value={codeLanguage}
              //   onChange={onCodeLanguageSelect}
            >
              {/* {codeLanguges.map((codeLanguage, index) => (
                <MenuItem key={index} value={codeLanguage}>
                  {codeLanguage}
                </MenuItem>
              ))} */}
            </MaterialSelect>
          </FormControl>
        </Box>
      ) : (
        <>
          <ToggleButtonGroup>
            <ToggleButtonStyled
              value="bold"
              onClick={(e, value) => {
                let cursorStart = textAreaRef?.current?.selectionStart
                let cursorEnd = textAreaRef?.current?.selectionEnd
                console.log('cursorStart', cursorStart)
                console.log('cursorEnd', cursorEnd)

                const selectText = `${editorValue.slice(
                  cursorStart,
                  cursorEnd,
                )}`
                console.log('selectText', selectText)
                setEditorValue(
                  editorValue.replace(selectText, `**${selectText}**`),
                )
              }}
              selected={isBold}
            >
              <FormatBoldIcon />
            </ToggleButtonStyled>
            <ToggleButtonStyled
              value="italic"
              //   onClick={(e, value) =>
              //     editor.dispatchCommand(FORMAT_TEXT_COMMAND, value)
              //   }
              selected={isItalic}
            >
              <FormatItalicIcon />
            </ToggleButtonStyled>
            <ToggleButtonStyled
              value="underline"
              //   onClick={(e, value) =>
              //     editor.dispatchCommand(FORMAT_TEXT_COMMAND, value)
              //   }
              selected={isUnderline}
            >
              <FormatUnderlinedIcon />
            </ToggleButtonStyled>
            <ToggleButtonStyled
              value="strikethrough"
              //   onClick={(e, value) =>
              //     editor.dispatchCommand(FORMAT_TEXT_COMMAND, value)
              //   }
              selected={isStrikethrough}
            >
              <FormatStrikethroughIcon />
            </ToggleButtonStyled>

            <ToggleButtonStyled value="">
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

            <ToggleButtonStyled value="">
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

            <ToggleButtonStyled value="">
              <FormatClearIcon />
            </ToggleButtonStyled>

            <ToggleButtonStyled
              value="code"
              //   onClick={(e, value) =>
              //     editor.dispatchCommand(FORMAT_TEXT_COMMAND, value)
              //   }
              selected={isCode}
            >
              <CodeIcon />
            </ToggleButtonStyled>

            <ToggleButtonStyled
              value="link"
              //   onClick={insertLink}
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
              value=""
              //   onClick={() => handleClickOpenFileBrowser('image')}
              // selected={formatType === 'left'}
            >
              <ImageIcon />
            </ToggleButtonStyled>
          </ToggleButtonGroup>

          <ToggleButtonGroup>
            <ToggleButtonStyled
              value="left"
              //   onClick={(e, value) =>
              //     editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value)
              //   }
              selected={formatType === 'left'}
            >
              <FormatAlignLeftIcon />
            </ToggleButtonStyled>

            <ToggleButtonStyled
              value="center"
              //   onClick={(e, value) =>
              //     editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value)
              //   }
              selected={formatType === 'center'}
            >
              <FormatAlignCenterIcon />
            </ToggleButtonStyled>

            <ToggleButtonStyled
              value="right"
              //   onClick={(e, value) =>
              //     editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value)
              //   }
              selected={formatType === 'right'}
            >
              <FormatAlignRightIcon />
            </ToggleButtonStyled>

            <ToggleButtonStyled
              value="justify"
              //   onClick={(e, value) =>
              //     editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value)
              //   }
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
        {/* <FloatingLinkEditor editor={editor} getSelectedNode={getSelectedNode} /> */}
      </Popover>
    </ToolbarWrapper>
  )
}
