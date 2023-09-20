// ** react
import { Fragment, useState, MouseEvent } from 'react'

// ** mui
import Popover from '@mui/material/Popover'

import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// ** icons
import TitleIcon from '@mui/icons-material/Title'
import TextFieldsIcon from '@mui/icons-material/TextFields'

// ** third party
import * as commands from '@uiw/react-md-editor/lib/commands'
import { ICommand } from '@uiw/react-md-editor/lib/commands'

// ** models
import EditorBaseCommandProps from '@/components/editor/commands/type'

type TitlesCommandProps = {} & EditorBaseCommandProps

export default function TitlesCommand({
  index,
  command,
  disabled,
  executeCommand,
}: TitlesCommandProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'titles-popover' : undefined

  const handlePopoverOpenClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)

  const handlePopoverClose = () => setAnchorEl(null)

  const handleClickCommand = (command: ICommand) => {
    executeCommand(command)
    handlePopoverClose()
  }

  const commandItems = [
    {
      title: 'Başlık 1',
      command: commands.title1,
      fontSize: 32,
    },
    {
      title: 'Başlık 2',
      command: commands.title2,
      fontSize: 30,
    },
    {
      title: 'Başlık 3',
      command: commands.title3,
      fontSize: 24,
    },
    {
      title: 'Başlık 4',
      command: commands.title4,
      fontSize: 21,
    },
    {
      title: 'Başlık 5',
      command: commands.title5,
      fontSize: 17,
    },
    {
      title: 'Başlık 6',
      command: commands.title6,
      fontSize: 14,
    },
  ]

  return (
    <Fragment>
      <IconButton
        disabled={disabled}
        size="small"
        onClick={handlePopoverOpenClick}
        key={index}
        tabIndex={index}
      >
        <TitleIcon fontSize="small" />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List dense disablePadding>
          {commandItems.map((commandItem, commandItemIndex) => (
            <ListItem key={commandItemIndex} disablePadding>
              <ListItemButton
                onClick={() => handleClickCommand(commandItem.command)}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <TextFieldsIcon sx={{ fontSize: commandItem.fontSize }} />
                </ListItemIcon>
                <ListItemText primary={commandItem.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </Fragment>
  )
}
