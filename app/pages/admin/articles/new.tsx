import React, {
  useState,
  useEffect,
  useRef,
  RefObject,
  ComponentType,
  SyntheticEvent,
  Fragment,
} from 'react'
import { NextPage } from 'next/types'
import dynamic, { LoaderComponent } from 'next/dynamic'
import moment from 'moment'
import Image from 'next/image'

import { useFormik } from 'formik'
import * as Yup from 'yup'
//import dayjs, { Dayjs } from 'dayjs'

// ** mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Box from '@mui/material/Box'
import { useTheme, styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import Switch from '@mui/material/Switch'
import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import PageProps from '@/models/AppPropsModel'
import LayoutAdminPage from '@/layouts/LayoutAdminPage'
import getServerSideProps from '@/utils/AdminServerSideProps'
import { ArticleFormModel } from '@/models/ArticleModel'

import TagService from '@/services/TagService'
import useTagQuery from '@/hooks/queries/useTagQuery'
import useCategoryQuery from '@/hooks/queries/useCategoryQuery'

import ListQueryModel from '@/models/ListQueryModel'

import TagModel from '@/models/TagModel'

import TagAutocomplete from '@/components/admin/articles/TagAutocomplete'
import AsyncAutocomplete from '@/components/AsyncAutocomplete'

import NextPageType from '@/models/NextPageType'

import Editor from '@/components/editor'
import CategoryModel from '@/models/CategoryModel'

// ** components
import DialogFileBrowser from '@/components/file-browser/DialogFileBrowser'
import FileModel from '@/models/FileModel'
import { UPLOAD_PATH_URL } from '@/config'

const CoverImageBox = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  position: 'relative',
  border: `1px dashed ${theme.palette.grey[800]}`,
  height: 250,
  width: '100%',
  '& .MuiSvgIcon-root': {
    fontSize: '50px',
    color: theme.palette.grey[300],
    position: 'absolute',
    top: '5vw',
    left: '5vw',
  },
  '&:hover': {
    borderColor: theme.palette.grey[500],
  },
}))

const AdminArticleNew: NextPageType = ({}: PageProps) => {
  const theme = useTheme()

  const [categoryQueryParams, setCategoryQueryParams] =
    useState<ListQueryModel>({
      s: '',
      sType: 'title',
    })

  const { categoriesQuery } = useCategoryQuery(categoryQueryParams)
  const categories = categoriesQuery(
    categoryQueryParams.s !== '' ? true : false,
  )

  const [selectCoverImage, setSelectCoverImage] = useState({} as FileModel)
  const [categoryValue, setCategoryValue] = useState(new Array<CategoryModel>())
  const [categorySearchText, setCategorySearchText] = useState('')
  const [imageBrowserOpen, setImageBrowserOpen] = useState(false)

  const initialValues: ArticleFormModel = {
    title: '',
    shortDescription: '',
    content: '',
    guid: '',
    publishingDate: new Date(),
    categories: [],
    tags: [],
    coverImage: '',
    isShow: true,
  }

  // form validate
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Zorunlu alan'),
    shortDescription: Yup.string().required('Zorunlu alan'),
    content: Yup.mixed().required('Zorunlu alan'),
    guid: Yup.string().required('Zorunlu alan'),
    publishingDate: Yup.date().required('Zorunlu alan'),
    categories: Yup.array().min(1, 'Zorunlu alan').required('Zorunlu alan'),
    tags: Yup.array().min(1, 'Zorunlu alan').required('Zorunlu alan'),
    //...
  })

  const [tagSelect, setTagSelect] = useState<(string | TagModel)[]>([])

  const handleCategoryAutoCompleteInputChange = (
    e: any,
    newInputValue: string,
  ) => {
    setCategoryQueryParams({
      ...categoryQueryParams,
      s: newInputValue,
    })
    setCategorySearchText(newInputValue)
  }

  const handleCategoryAutoCompleteChange = (
    e: SyntheticEvent<Element, Event>,
    val: CategoryModel[],
    reason: AutocompleteChangeReason,
  ) => {
    if (reason === 'clear') {
      setFieldValue('category', null)
      setCategoryValue([])
      return
    }
    setFieldValue(
      'category',
      val.map((v) => v._id),
    )
    setCategoryValue(val)
  }

  const handleSelectCoverImage = () => setImageBrowserOpen(true)

  const selectImageConfirm = () => {
    setFieldValue('coverImage', selectCoverImage?._id)
    setImageBrowserOpen(false)
  }

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
    setTouched,
  } = useFormik<ArticleFormModel>({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // try {
      //   await axios.post(`/api/login`, values)
      //   enqueueSnackbar('Başarıyla giriş yapıldı.', {
      //     variant: 'success',
      //   })
      //   router.push('/admin')
      // } catch (err) {
      //   console.error(`Admin login page onSubmit() Error: ${err}`)
      //   enqueueSnackbar('Giriş yapılırken bir sorun oluştu.', {
      //     variant: 'error',
      //   })
      // }
      // setSubmitting(false)
      // resetForm()
    },
  })

  const handleSelectImageChange = (data: FileModel[]) =>
    setSelectCoverImage(data[data.length - 1])

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              type="text"
              id="title"
              label="Başlık"
              variant="outlined"
              size="medium"
              disabled={isSubmitting}
              {...getFieldProps('title')}
              helperText={errors.title && touched.title ? errors.title : null}
              error={errors.title ? touched.title : false}
            />

            <TextField
              fullWidth
              multiline
              type="text"
              id="shortDescription"
              label="Kısa Açıklama"
              variant="outlined"
              size="small"
              disabled={isSubmitting}
              {...getFieldProps('shortDescription')}
              helperText={
                errors.shortDescription && touched.shortDescription
                  ? errors.shortDescription
                  : null
              }
              error={errors.shortDescription ? touched.shortDescription : false}
            />

            <Editor />
          </Stack>
        </Grid>

        <Grid item xs={3}>
          <Stack spacing={2}>
            <Card>
              <CardHeader
                title="Ayarlar"
                action={<Button variant="contained">YAYINLA</Button>}
              />
              <CardContent>
                <Stack spacing={2}>
                  <DatePicker
                    label="Tarih"
                    value={values.publishingDate}
                    onChange={(date) => setFieldValue('publishingDate', date)}
                    slotProps={{
                      textField: { size: 'small', fullWidth: true },
                    }}
                  />

                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.isShow}
                          onChange={(e, checked) =>
                            setFieldValue('isShow', checked)
                          }
                        />
                      }
                      label={values.isShow ? 'Aktif' : 'Pasif'}
                    />
                  </FormGroup>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Öne Çıkan Görsel" />
              <CardContent>
                <CoverImageBox onClick={handleSelectCoverImage}>
                  {values.coverImage === '' ? (
                    <AddPhotoAlternateIcon />
                  ) : (
                    <Image
                      fill
                      src={`${UPLOAD_PATH_URL}/${
                        selectCoverImage.path ? `${selectCoverImage.path}/` : ''
                      }${selectCoverImage.filename}`}
                      alt=""
                    />
                  )}
                </CoverImageBox>
              </CardContent>
            </Card>
            <TagAutocomplete select={tagSelect} setSelect={setTagSelect} />

            <AsyncAutocomplete
              multiple
              name="categories"
              value={categoryValue}
              inputValue={categorySearchText}
              label="Evebeyn Kategori"
              handleInputChange={handleCategoryAutoCompleteInputChange}
              handleChange={handleCategoryAutoCompleteChange}
              setTouched={setTouched}
              data={categories?.data || []}
              objName="title"
              loading={categories.isLoading}
              helperText={
                errors.categories && touched.categories
                  ? (errors.categories as any)
                  : null
              }
              error={errors.categories ? touched.categories : false}
            />
          </Stack>
        </Grid>
      </Grid>

      <DialogFileBrowser
        enableSelectedFiles
        open={imageBrowserOpen}
        setOpen={setImageBrowserOpen}
        selectedFiles={[selectCoverImage]}
        handleSelectFilesChange={handleSelectImageChange}
        handleConfirmFunction={selectImageConfirm}
      />
    </Fragment>
  )
}

AdminArticleNew.layout = LayoutAdminPage
export default AdminArticleNew

export { getServerSideProps }
