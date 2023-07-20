// import Markdown from 'react-markdown'
import dynamic from 'next/dynamic'
import { MutableRefObject, SyntheticEvent, useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Toolbar from '@/components/editor/Toolbar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Markdown from 'react-markdown'

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
  const [selectTab, setSelectTab] = useState(0)

  const [value, setValue] = useState('atakan yasin uludağ')
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setSelectTab(newValue)
  }

  return (
    <EditorWrapperBox>
      <TabsWrapper value={selectTab} onChange={handleTabChange}>
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
      )}
    </EditorWrapperBox>
  )
}
