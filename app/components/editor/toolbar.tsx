import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  MouseEvent,
} from 'react'
import { stateToHTML } from 'draft-js-export-html'
import {
  Editor as DraftJS,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  DraftBlockType,
  DraftInlineStyleType,
} from 'draft-js'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import ToggleButton, { ToggleButtonClasses } from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Popover from '@mui/material/Popover'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText'
import BorderColorIcon from '@mui/icons-material/BorderColor'

import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'

import { CirclePicker } from 'react-color'

import { stateFromHTML } from 'draft-js-import-html'

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

//https://codesandbox.io/s/react-n8dqp?file=/src/TextEditor.js

const ToolbarWrapper = styled(Box)(({ theme }) => ({
  // borderBottomWidth: 1,
  // borderBottomStyle: 'solid',
  // borderBottomColor: theme.palette.secondary.main,
  padding: 4,
  display: 'flex',
}))

function EditorToolbar({ editorState, setEditorState }: IEditorToolbar) {
  const [fontColorPickerAnchorEl, setFontColorPickerAnchorEl] =
    useState<HTMLSpanElement | null>(null)
  const [bgColorPickerAnchorEl, setBgColorPickerAnchorEl] =
    useState<HTMLSpanElement | null>(null)

  const fontColorPickerOpen = Boolean(fontColorPickerAnchorEl)
  const bgColorPickerOpen = Boolean(bgColorPickerAnchorEl)

  const [fontColor, setFontColor] = useState<string | undefined>(undefined)
  const [bgColor, setBgColor] = useState<string | undefined>(undefined)

  const handleChangeFontColor = (color: string) => {
    setFontColor(color)
    setEditorState(
      RichUtils.toggleInlineStyle(editorState, `fontColor-${color}`),
    )
  }

  const handleChangeBgColor = (color: string) => {
    setBgColor(color)
    setEditorState(RichUtils.toggleInlineStyle(editorState, `bgColor-${color}`))
  }

  const handleApplyStyle = (
    event: React.MouseEvent<Partial<HTMLElement>>,
    value: string,
  ) => setEditorState(RichUtils.toggleInlineStyle(editorState, value))

  const styleSelected = (value: string) =>
    editorState.getCurrentInlineStyle().has(value)

  return (
    <ToolbarWrapper>
      <ToggleButtonGroup>
        <ToggleButton
          value="BOLD"
          size="small"
          onClick={handleApplyStyle}
          selected={styleSelected('BOLD')}
        >
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton
          value="ITALIC"
          size="small"
          onClick={handleApplyStyle}
          selected={styleSelected('ITALIC')}
        >
          <FormatItalicIcon />
        </ToggleButton>
        <ToggleButton
          value="UNDERLINE"
          size="small"
          onClick={handleApplyStyle}
          selected={styleSelected('UNDERLINE')}
        >
          <FormatUnderlinedIcon />
        </ToggleButton>

        <ToggleButton
          value="STRIKETHROUGH"
          size="small"
          onClick={handleApplyStyle}
          selected={styleSelected('STRIKETHROUGH')}
        >
          <FormatStrikethroughIcon />
        </ToggleButton>

        <ToggleButton
          value=""
          size="small"
          onClick={(e) => setFontColorPickerAnchorEl(e.currentTarget)}
        >
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
        </ToggleButton>

        <ToggleButton
          value=""
          size="small"
          onClick={(e) => setBgColorPickerAnchorEl(e.currentTarget)}
        >
          <Badge
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: bgColor,
              },
            }}
            variant="dot"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            invisible={!bgColor ? true : false}
          >
            <BorderColorIcon />
          </Badge>
        </ToggleButton>
      </ToggleButtonGroup>

      <Divider
        orientation="vertical"
        sx={{ marginLeft: 2, marginRight: 2 }}
        flexItem
      />

      <ToggleButtonGroup>
        <ToggleButton
          value="ALIGN_LEFT"
          size="small"
          onClick={handleApplyStyle}
          selected={styleSelected('ALIGN_LEFT')}
        >
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton
          value="ALIGN_CENTER"
          size="small"
          onClick={handleApplyStyle}
          selected={styleSelected('ALIGN_CENTER')}
        >
          <FormatAlignCenterIcon />
        </ToggleButton>
        <ToggleButton
          value="ALIGN_RIGHT"
          size="small"
          onClick={handleApplyStyle}
          selected={styleSelected('ALIGN_RIGHT')}
        >
          <FormatAlignRightIcon />
        </ToggleButton>
      </ToggleButtonGroup>

      <Popover
        open={fontColorPickerOpen}
        anchorEl={fontColorPickerAnchorEl}
        onClose={() => setFontColorPickerAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box padding={2}>
          <CirclePicker
            color={fontColor}
            onChange={(color) => handleChangeFontColor(color.hex)}
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
      </Popover>

      <Popover
        open={bgColorPickerOpen}
        anchorEl={bgColorPickerAnchorEl}
        onClose={() => setBgColorPickerAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box padding={2}>
          <CirclePicker
            color={bgColor}
            onChange={(color) => handleChangeBgColor(color.hex)}
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
      </Popover>
    </ToolbarWrapper>
  )
}

export default EditorToolbar
