// ** react
import {
  Fragment,
  useState,
  MouseEvent,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react'

// ** next
import Image from 'next/image'

// ** third party
import { useQueryClient } from 'react-query'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import { useSnackbar } from 'notistack'

// ** mui
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import ToggleButton from '@mui/material/ToggleButton'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Tooltip from '@mui/material/Tooltip'
import { PopoverPosition } from '@mui/material/Popover'

// ** models
import ListResponseModel from '@/models/ListResponseModel'
import FileModel, { FileListQueryModel } from '@/models/FileModel'

// icons
import FolderIcon from '@mui/icons-material/Folder'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import EditIcon from '@mui/icons-material/Edit'
import DownloadIcon from '@mui/icons-material/Download'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

// ** components
import FileBrowserIcon from '@/components/file-browser/Icons'
import EditFile from '@/components/admin/files/EditFile'

// ** utils
import { isImageFile } from '@/utils/MimeTypeNames'

// ** service
import FileService from '@/services/FileService'

// ** core
import { QUERY_NAMES } from '@/core/Constants'

// ** config
import { UPLOAD_PATH_URL } from '@/config'

// ** hooks
import useComponentContext from '@/hooks/useComponentContext'

const FileItemBoxStyled = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '140px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}))

const DragAndDropWrapperStyled = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  top: 0,
  borderWidth: '2px',
  borderStyle: 'dashed',
  borderColor: theme.palette.secondary.main,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

const ToggleButtonStyled = styled(ToggleButton)(({ theme }) => ({
  width: '100px',
  height: '100px',
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  '& .MuiTypography-root': {
    fontSize: '12px',
    overflow: 'hidden',
    width: '100%',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}))

export type FileBrowserProps = {
  params: FileListQueryModel
  setParams: Dispatch<SetStateAction<FileListQueryModel>>
  items: ListResponseModel<FileModel[]>
  loading: boolean
}
type UploadingFilesProps = {
  name: string
  size: number
  waiting: boolean
  uploading: boolean
}

export default function FileBrowser({
  params,
  setParams,
  items,
  loading,
}: FileBrowserProps) {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const { setFormDrawerData } = useComponentContext()

  const [selectFolders, setSelectFolders] = useState(new Array<FileModel>())
  const [uploadingFiles, setUploadingFiles] = useState(
    new Array<UploadingFilesProps>(),
  )
  const [contextMenu, setContextMenu] = useState<PopoverPosition | null>(null)
  const [contextMenuData, setContextMenuData] = useState<FileModel | null>(null)

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [NativeTypes.FILE],
    canDrop(item) {
      return true
    },
    collect: (monitor: DropTargetMonitor) => {
      const item: { files: File[] } | null = monitor.getItem()
      const path =
        selectFolders.length > 0
          ? selectFolders[selectFolders.length - 1].path
          : null
      if (item && item?.files.length > 0) {
        handleFilesUpload(item.files, path)
      }
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }
    },
  })

  // variables
  const dragAndDropActive = canDrop && isOver
  const isLoading = loading || uploadingFiles.length > 0

  const handleFilesUpload = async (files: File[], path: string | null) => {
    const uploadedFiles = []
    const _uploadingFiles = files.map(({ name, size }) => ({
      name,
      size,
      waiting: true,
      uploading: false,
    }))
    setUploadingFiles([..._uploadingFiles])

    for await (const file of files) {
      const index = _uploadingFiles.findIndex(
        (f) => f.name === file.name && f.size === file.size,
      )
      _uploadingFiles[index] = {
        ..._uploadingFiles[index],
        waiting: false,
        uploading: true,
      }
      setUploadingFiles([..._uploadingFiles])
      const response = await FileService.uploadFile(file, path)
      //await snooze(10000) //todo: sonradan kaldırılacak

      enqueueSnackbar(`"${response[0].filename}" yüklendi.`, {
        variant: 'success',
      })

      uploadedFiles.push(response[0])

      _uploadingFiles[index] = {
        ..._uploadingFiles[index],
        waiting: false,
        uploading: false,
      }
      setUploadingFiles([..._uploadingFiles])
    }

    setUploadingFiles([])
    setParams({
      ...params,
      page: 1,
    })
    queryClient.invalidateQueries(QUERY_NAMES.FILES)
  }

  const handleBreadcrumbClick = (folder: FileModel | null) => {
    setParams({
      ...params,
      folderId: folder?._id || null,
    })

    if (!folder) {
      setSelectFolders([])
    } else {
      const newSelectFolders = [...selectFolders]
      const findIndex = newSelectFolders.findIndex((f) => f._id === folder._id)
      newSelectFolders.splice(findIndex + 1)
      setSelectFolders(newSelectFolders)
    }
  }

  const handleFolderClick = (folderId: string) => {
    const findFolderData = items.results.find((item) => item._id === folderId)
    setParams({
      ...params,
      folderId,
    })
    if (findFolderData) {
      setSelectFolders([...selectFolders, ...[findFolderData]])
    }
  }

  const handleContextMenu = (
    event: MouseEvent<HTMLButtonElement>,
    file: FileModel,
  ) => {
    event.preventDefault()
    setContextMenuData(file)
    setContextMenu(
      contextMenu === null
        ? {
            left: event.clientX + 2,
            top: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    )
  }

  const handleMenuClose = () => {
    setContextMenuData(null)
    setContextMenu(null)
  }

  const handleClickDownloadMenuItem = () => {}

  const handleClickEditMenuItem = () => {
    if (!contextMenuData) return
    handleMenuClose()
    setFormDrawerData({
      open: true,
      title: `${contextMenuData.filename || contextMenuData.title}`,
      content: (
        <EditFile
          data={{
            _id: contextMenuData._id,
            title: contextMenuData.title,
            description: contextMenuData.description,
          }}
          isFolder={contextMenuData.isFolder}
        />
      ),
      submitButtonText: 'Kaydet',
      submit: false,
    })
  }

  return (
    <Grid container direction="row" justifyContent="flex-start" spacing={1}>
      <Grid item xs={12}>
        <Box>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Button
              variant="text"
              color="inherit"
              onClick={() => handleBreadcrumbClick(null)}
              disabled={isLoading}
            >
              Ana Dizin
            </Button>
            {selectFolders.map((folder) => (
              <Button
                variant="text"
                color="inherit"
                key={folder._id}
                onClick={() => handleBreadcrumbClick(folder)}
                disabled={
                  selectFolders[selectFolders.length - 1]._id === folder._id ||
                  isLoading
                }
              >
                {folder.title}
              </Button>
            ))}
          </Breadcrumbs>
        </Box>
      </Grid>

      {!isLoading && (
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            spacing={1}
            ref={drop}
            sx={{ position: 'relative' }}
          >
            {dragAndDropActive && (
              <DragAndDropWrapperStyled>
                <Typography variant="h6">
                  Dosyaları buraya sürükleyin.
                </Typography>
              </DragAndDropWrapperStyled>
            )}
            {items.results.map((item) => (
              <Grid item key={item._id}>
                <Box sx={{ opacity: !dragAndDropActive ? 1 : 0.3 }}>
                  <Tooltip title={item.title} placement="bottom">
                    <ToggleButtonStyled
                      fullWidth
                      size="large"
                      value={item._id}
                      onClick={() =>
                        item.isFolder && handleFolderClick(item._id)
                      }
                      style={{ cursor: 'pointer' }}
                      onContextMenu={(e) => handleContextMenu(e, item)}
                      disabled={isLoading}
                    >
                      {item.isFolder === true ? (
                        <Fragment>
                          <FolderIcon sx={{ fontSize: 40 }} />
                          <Typography>{item.title}</Typography>
                        </Fragment>
                      ) : (
                        <FileItemBoxStyled>
                          {isImageFile(item.mimetype) ? (
                            <Image
                              loading="lazy"
                              src={`${UPLOAD_PATH_URL}/${
                                item.path ? `${item.path}/` : ''
                              }${item.filename}`}
                              alt="Picture of the author"
                              layout="fill"
                              objectFit="contain"
                            />
                          ) : (
                            <Fragment>
                              <FileBrowserIcon
                                fileName={item.filename}
                                fontSize="large"
                              />
                              <Typography>{item.title}</Typography>
                            </Fragment>
                          )}
                        </FileItemBoxStyled>
                      )}
                    </ToggleButtonStyled>
                  </Tooltip>
                </Box>
              </Grid>
            ))}

            {uploadingFiles.map((item, index) => (
              <Grid key={index} item>
                <ToggleButtonStyled
                  fullWidth
                  size="large"
                  value=""
                  style={{ cursor: 'pointer' }}
                  disabled={isLoading}
                >
                  <FileItemBoxStyled>
                    <Fragment>
                      <FileBrowserIcon fileName={item.name} fontSize="large" />
                      <Typography>{item.name}</Typography>

                      {item.waiting && (
                        <Typography variant="caption">Bekleniyor...</Typography>
                      )}
                      {item.uploading && (
                        <Box sx={{ width: '100%', marginTop: '5px' }}>
                          <LinearProgress />
                        </Box>
                      )}
                    </Fragment>
                  </FileItemBoxStyled>
                </ToggleButtonStyled>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}

      <Menu
        open={contextMenu !== null}
        onClose={handleMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null ? contextMenu : undefined}
      >
        <MenuItem disabled={isLoading} onClick={handleClickEditMenuItem}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Düzenle</ListItemText>
        </MenuItem>
        <MenuItem disabled={isLoading} onClick={handleClickDownloadMenuItem}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>İndir</ListItemText>
        </MenuItem>
        <MenuItem disabled={isLoading}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sil</ListItemText>
        </MenuItem>
      </Menu>
    </Grid>
  )
}
