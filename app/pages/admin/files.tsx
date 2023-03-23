// ** react
import { useState } from 'react'

// ** next
import Image from 'next/image'

// ** mui
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'
import ToggleButton from '@mui/material/ToggleButton'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Badge from '@mui/material/Badge'

// icons
import FolderIcon from '@mui/icons-material/Folder'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import RefreshIcon from '@mui/icons-material/Refresh'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'

// ** third party
import moment from 'moment'

// ** services
import TagService from '@/services/TagService'

// ** models
import PageProps from '@/models/AppPropsModel'
import FileModel, { FileListQueryModel } from '@/models/FileModel'
import ListResponseModel from '@/models/ListResponseModel'
import NextPageType from '@/models/NextPageType'

// ** layouts
import LayoutAdminPage from '@/layouts/LayoutAdminPage'

// ** utils
import getServerSideProps from '@/utils/AdminServerSideProps'
import { getExtentionByFileName, isImageFile } from '@/utils/MimeTypeNames'

// ** hooks
import useFileQuery from '@/hooks/queries/useFileQuery'
import useComponentContext from '@/hooks/useComponentContext'

// ** components
import DataGrid from '@/components/datagrid'
import SearchInput from '@/components/admin/SearchInput'
import FileBrowser from '@/components/file-browser'

// ** constants
import { QUERY_NAMES } from '@/core/Constants'
import { OrderType } from '@/models/enums'

const Files: NextPageType = ({ settings }: PageProps) => {
  const [params, setParams] = useState<FileListQueryModel>({
    page: 1,
    pageSize: 9999,
    folderId: null,
    order: 'isFolder',
    orderBy: OrderType.ASC,
  })

  const [customLoading, setCustomLoading] = useState(false)

  const { filesQuery } = useFileQuery(params)
  const { setFormDrawerData } = useComponentContext()

  const { data, isLoading, isFetching } = filesQuery()
  const items = data as ListResponseModel<FileModel[]>
  const loading = isLoading || isFetching || customLoading

  return (
    <Box>
      <Grid
        container
        spacing={1}
        display="flex"
        justifyContent="space-between"
        pb={3}
      >
        <Grid item md={9} xs={12} display="flex" alignItems="center">
          <Stack direction="row" spacing={1}>
            <Typography variant="h5" fontWeight={500}>
              Ortam Kütüphanesi
            </Typography>
          </Stack>
        </Grid>

        <Grid item md={3} xs={12}>
          {/* <SearchInput
            loading={loading}
            params={params}
            setParams={setParams}
          /> */}
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1 }}>
        <FileBrowser
          items={items}
          loading={loading}
          params={params}
          setParams={setParams}
        />
      </Box>
    </Box>
  )
}

Files.layout = LayoutAdminPage
Files.title = 'Ortam Kütüphanesi'
export default Files

export { getServerSideProps }
