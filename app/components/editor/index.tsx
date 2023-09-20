// import Markdown from 'react-markdown'
import dynamic, { DynamicOptions, Loader } from 'next/dynamic'
import { MutableRefObject, SyntheticEvent, useRef, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import rehypeRaw from 'rehype-raw'
import IconButton from '@mui/material/IconButton'

import * as commands from '@uiw/react-md-editor/lib/commands'
import {
  ExecuteState,
  TextAreaTextApi,
  ExecuteCommandState,
  ICommand,
} from '@uiw/react-md-editor'

import FileBrowser from '@/components/file-browser'
import useComponentContext from '@/hooks/useComponentContext'

import { css } from '@emotion/css'
import FileModel from '@/models/FileModel'
import { UPLOAD_PATH_URL } from '@/config'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import TitleIcon from '@mui/icons-material/Title'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import LinkIcon from '@mui/icons-material/Link'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import CodeIcon from '@mui/icons-material/Code'
import DataObjectIcon from '@mui/icons-material/DataObject'
import ImageIcon from '@mui/icons-material/Image'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import ChecklistIcon from '@mui/icons-material/Checklist'

import { OverridableComponent } from '@mui/material/OverridableComponent'
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'
import TitlesCommand from './commands/TitlesCommand'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })
// const Markdown = dynamic(
//   () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
//   { ssr: false }
// );

const Icon = ({ name, ...props }: { name?: string } & SvgIconProps) => {
  switch (name) {
    case commands.bold.name:
      return <FormatBoldIcon {...props} />
    case commands.italic.name:
      return <FormatItalicIcon {...props} />
    case commands.strikethrough.name:
      return <FormatStrikethroughIcon {...props} />
    case 'underline':
      return <FormatUnderlinedIcon {...props} />
    case commands.hr.name:
      return <HorizontalRuleIcon {...props} />
    case commands.link.name:
      return <LinkIcon {...props} />
    case commands.quote.name:
      return <FormatQuoteIcon {...props} />
    case commands.code.name:
      return <CodeIcon {...props} />
    case commands.codeBlock.name:
      return <DataObjectIcon {...props} />
    case commands.codeBlock.name:
      return <DataObjectIcon {...props} />
    case 'update':
      return <ImageIcon {...props} />
    case commands.orderedListCommand.name:
      return <FormatListNumberedIcon {...props} />
    case commands.unorderedListCommand.name:
      return <FormatListBulletedIcon {...props} />
    case commands.checkedListCommand.name:
      return <ChecklistIcon {...props} />
    default:
      return <></>
  }
}

const EditorWrapperBox = styled(Box)(({ theme }) => ({
  width: '100%',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.palette.grey[theme.palette.mode === 'dark' ? 800 : 400],
  borderRadius: theme.spacing(0.5),
}))

const ToolbarBox = styled(Box)(({ theme }) => ({
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  borderBottomColor:
    theme.palette.grey[theme.palette.mode === 'dark' ? 800 : 400],
}))

const TabsWrapper = styled(Tabs)(({ theme }) => ({
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  borderBottomColor:
    theme.palette.grey[theme.palette.mode === 'dark' ? 800 : 400],
}))

const TextArea = styled('textarea')(({ theme }) => ({
  width: '100%',
  height: '300px',
  backgroundColor: theme.palette.primary.main,
  border: 'none',
  color: theme.palette.secondary.main,
  fontFamily: 'Menlo, Consolas, Monaco, monospace',
  resize: 'none',
  WebkitBoxShadow: 'none',
  boxShadow: 'none',
  outline: 'none',
}))

export default function Editor() {
  const theme = useTheme()

  const { setConfirmDialogData, handleConfirmDialogClose } =
    useComponentContext()

  const [value, setValue] = useState('')

  // console.log(value)
  // console.log(encodeURI(value))

  const test = css`
    background-image: none;
  `

  const handleSelectImageFilesChange = (
    data: FileModel[],
    api: TextAreaTextApi,
  ) => {
    data.forEach((item) => {
      // let modifyText = `### ${state.selectedText}\n`
      // if (!state.selectedText) {
      //   modifyText = `### `
      // }

      api.replaceSelection(
        `<img src="${UPLOAD_PATH_URL}/${item.path ? `${item.path}/` : ''}${
          item.filename
        }" alt="image" width="100%">`,
      )

      // editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      //   src: `${UPLOAD_PATH_URL}/${item.path ? `${item.path}/` : ''}${
      //     item.filename
      //   }`,
      //   altText: '',
      // })
    })
  }

  const handleSelectImageButton = (
    close: () => void,
    api: TextAreaTextApi | undefined,
  ) => {
    if (!api) return
    setConfirmDialogData({
      open: true,
      title: 'Resim Seç',
      content: (
        <FileBrowser
          enableSelectedFiles
          handleSelectFilesChange={(data) =>
            handleSelectImageFilesChange(data, api)
          }
        />
      ),
      handleConfirmFunction: () => {
        handleConfirmDialogClose()
        close()
      },
      maxWidth: 'xl',
    })
  }

  const imageCommand: commands.ICommand = commands.group([], {
    name: 'update',
    groupName: 'update',
    children: (handle) => (
      <Box padding={0.5} display="flex" flexDirection="column">
        <Button
          variant="text"
          size="small"
          sx={{ textTransform: 'none' }}
          onClick={() => handleSelectImageButton(handle.close, handle?.textApi)}
        >
          Resim Seç
        </Button>
        <Button
          variant="text"
          size="small"
          sx={{ textTransform: 'none' }}
          onClick={() => {
            handle.textApi?.replaceSelection(
              `![Alt text](https://picsum.photos/200/300)`,
            )
            handle.close()
          }}
        >
          URL Resim
        </Button>
      </Box>
    ),
  })

  const titlesCommand: ICommand = {
    name: 'titles',
    keyCommand: 'titles',
  }

  const underlineCommand: ICommand = {
    name: 'underline',
    keyCommand: 'underline',
    execute: (state, api) => {
      let modifyText = `<ins>${state.selectedText}</ins>\n`
      if (!state.selectedText) {
        modifyText = `<ins></ins>`
      }
      api.replaceSelection(modifyText)
    },
  }

  return (
    <EditorWrapperBox>
      {/* <ReactMarkdown
        children={value}
        rehypePlugins={[rehypeRaw] as PluggableList}
      /> */}

      <MDEditor
        className={test}
        value={value}
        onChange={(value) => setValue(value || '')}
        components={{
          toolbar: (command, disabled, executeCommand, index) => {
            switch (command.name) {
              case 'titles':
                return (
                  <TitlesCommand
                    index={index}
                    command={command}
                    disabled={disabled}
                    executeCommand={executeCommand}
                  />
                )
              default:
                return (
                  <IconButton
                    disabled={disabled}
                    size="small"
                    onClick={() => executeCommand(command)}
                    key={index}
                    tabIndex={index}
                  >
                    <Icon fontSize="small" name={command.name} />
                  </IconButton>
                )
            }
          },
        }}
        commands={[
          titlesCommand,
          commands.bold,
          commands.italic,
          commands.strikethrough,
          underlineCommand,
          commands.hr,
          commands.divider,
          commands.link,
          commands.quote,
          commands.code,
          commands.codeBlock,
          imageCommand,
          commands.divider,
          commands.orderedListCommand,
          commands.unorderedListCommand,
          commands.checkedListCommand,
        ]}
      />
    </EditorWrapperBox>
  )
}
