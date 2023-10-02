// ** react
import { useState, useEffect, SyntheticEvent, Fragment } from 'react'

// ** next
import Image from 'next/image'

// ** third party
import { useFormik } from 'formik'
import * as Yup from 'yup'

// ** mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Box from '@mui/material/Box'
import { useTheme, styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import { AutocompleteChangeReason } from '@mui/material/Autocomplete'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'
import FormHelperText from '@mui/material/FormHelperText'

// ** icons
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import WarningIcon from '@mui/icons-material/Warning'
import DoneIcon from '@mui/icons-material/Done'

// ** models
import PageProps from '@/models/AppPropsModel'
import NextPageType from '@/models/NextPageType'
import CategoryModel from '@/models/CategoryModel'
import ListQueryModel from '@/models/ListQueryModel'
import TagModel from '@/models/TagModel'
import FileModel from '@/models/FileModel'
import { ArticleFormModel } from '@/models/ArticleModel'

// ** layouts
import LayoutAdminPage from '@/layouts/LayoutAdminPage'

// ** utils
import getServerSideProps from '@/utils/AdminServerSideProps'
import generateFileUrl from '@/utils/GenerateFileUrl'

// ** services
import ArticleService from '@/services/ArticleService'
import TagService from '@/services/TagService'

// ** hooks
import useTagQuery from '@/hooks/queries/useTagQuery'
import useCategoryQuery from '@/hooks/queries/useCategoryQuery'

// ** components
import Editor from '@/components/editor'
import DialogFileBrowser from '@/components/file-browser/DialogFileBrowser'
import TagAutocomplete from '@/components/admin/articles/TagAutocomplete'
import AsyncAutocomplete from '@/components/AsyncAutocomplete'

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
const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  paddingBottom: theme.spacing(0.5),
  '& .MuiTypography-root': {
    fontSize: 17,
  },
}))

const AdminArticleNew: NextPageType = ({}: PageProps) => {
  const theme = useTheme()

  const [guidExistsLoading, setGuidExistsLoading] = useState(false)
  const [guidExists, setGuidExists] = useState<boolean | null>(null)
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
  const [tagSelect, setTagSelect] = useState<(string | TagModel)[]>([])
  console.log('tagSelect', tagSelect)
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
      setFieldValue('categories', null)
      setCategoryValue([])
      return
    }
    setFieldValue(
      'categories',
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
    isValid,
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

  console.log('values', values)

  useEffect(() => {
    if (values._id && initialValues.guid === values.guid) {
      setGuidExistsLoading(false)
      setGuidExists(false)
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      if (values.guid) {
        setGuidExistsLoading(true)
        const response = await ArticleService.guidExists(values.guid)
        setTimeout(() => {
          setGuidExistsLoading(false)
          setGuidExists(response)
        }, 500)
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [values.guid])

  const handleSelectImageChange = (data: FileModel[]) =>
    setSelectCoverImage(data[data.length - 1])

  const handleChangeSetContent = (text: string) => {
    setFieldValue('content', text)
  }

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Stack spacing={2}>
            <TextField
              required
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
              required
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

            <FormControl
              fullWidth
              size="small"
              variant="outlined"
              error={errors.guid ? touched.guid : false}
              required
            >
              <InputLabel htmlFor="guid">Kısa Link</InputLabel>
              <OutlinedInput
                id="guid"
                required
                {...getFieldProps('guid')}
                disabled={isSubmitting || guidExistsLoading}
                endAdornment={
                  <InputAdornment position="end">
                    {guidExistsLoading ? (
                      <CircularProgress size={18} />
                    ) : (
                      guidExists !== null &&
                      (!guidExists ? (
                        <DoneIcon />
                      ) : (
                        <Tooltip
                          title="Eklemeye çalıştığınız guid bilgisi zaten kullanılıyor."
                          placement="top"
                        >
                          <WarningIcon />
                        </Tooltip>
                      ))
                    )}
                  </InputAdornment>
                }
                label="Kısa Link"
              />
              <FormHelperText>
                {errors.guid && touched.guid ? errors.guid : null}
              </FormHelperText>
            </FormControl>

            <Editor value={values.content} setValue={handleChangeSetContent} />
          </Stack>
        </Grid>

        <Grid item xs={3}>
          <Stack spacing={2}>
            <Card>
              <StyledCardHeader
                title="Ayarlar"
                action={
                  <Button
                    variant="contained"
                    disabled={
                      !isValid || guidExistsLoading || guidExists === true
                    }
                  >
                    YAYINLA
                  </Button>
                }
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

                  <Box display="flex" justifyContent="flex-end">
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
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <StyledCardHeader title="Öne Çıkan Görsel" />
              <CardContent>
                <CoverImageBox onClick={handleSelectCoverImage}>
                  {values.coverImage === '' ? (
                    <AddPhotoAlternateIcon />
                  ) : (
                    <Image
                      fill
                      src={generateFileUrl(selectCoverImage)}
                      alt=""
                    />
                  )}
                </CoverImageBox>
              </CardContent>
            </Card>

            <Card>
              <StyledCardHeader title="Kategori & Etiketler" />
              <CardContent>
                <Stack spacing={2}>
                  <TagAutocomplete
                    select={tagSelect}
                    setSelect={setTagSelect}
                  />

                  {/* <AsyncAutocomplete<CategoryModel[], ArticleFormModel > */}
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
              </CardContent>
            </Card>
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
