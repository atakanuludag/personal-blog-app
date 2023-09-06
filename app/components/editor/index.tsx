// import Markdown from 'react-markdown'
import dynamic, { DynamicOptions, Loader } from 'next/dynamic'
import { MutableRefObject, SyntheticEvent, useRef, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Toolbar from '@/components/editor/Toolbar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Markdown from 'react-markdown'
import * as commands from '@uiw/react-md-editor/lib/commands'
import {
  ExecuteState,
  TextAreaTextApi,
  ExecuteCommandState,
} from '@uiw/react-md-editor'

import FileBrowser from '@/components/file-browser'
import useComponentContext from '@/hooks/useComponentContext'

import { css } from '@emotion/css'
import ImageIcon from '@mui/icons-material/Image'
import FileModel from '@/models/FileModel'
import { UPLOAD_PATH_URL } from '@/config'
import Button from '@mui/material/Button'
import TitleIcon from '@mui/icons-material/Title'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })
// const Markdown = dynamic(
//   () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
//   { ssr: false }
// );
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
    icon: commands.image.icon,
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
    buttonProps: { 'aria-label': 'Insert Image' },
  })

  return (
    <EditorWrapperBox>
      <MDEditor
        className={test}
        value={value}
        onChange={(value) => setValue(value as string)}
        commands={[
          commands.group(
            [
              commands.title1,
              commands.title2,
              commands.title3,
              commands.title4,
              commands.title5,
              commands.title6,
            ],
            {
              name: 'title',
              groupName: 'title',
              buttonProps: { 'aria-label': 'Insert title' },
              icon: <TitleIcon sx={{ fontSize: 13 }} />,
            },
          ),
          commands.bold,
          commands.italic,
          commands.strikethrough,
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
          commands.comment,
        ]}
      />
      {/* <TabsWrapper value={selectTab} onChange={handleTabChange}>
        <Tab label="Editör" id="editor" />
        <Tab label="Önizleme" id="preview" />
      </TabsWrapper>

      {selectTab === 0 ? (
        <Box display="flex" flexDirection="column">
          <ToolbarBox>
            <Toolbar
              textAreaRef={textAreaRef}
              editorValue={value}
              setEditorValue={setValue}
            />
          </ToolbarBox>

          <TextArea
            ref={textAreaRef}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </Box>
      ) : (
        <Box pl={1} pr={1}>
          <Markdown>{value}</Markdown>
        </Box>
      )} */}
    </EditorWrapperBox>
  )
}
