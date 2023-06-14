import React, {
  useState,
  useEffect,
  useRef,
  RefObject,
  ComponentType,
  SyntheticEvent,
} from 'react'
import { NextPage } from 'next/types'
import dynamic, { LoaderComponent } from 'next/dynamic'
import moment from 'moment'

import { useFormik } from 'formik'
import * as Yup from 'yup'

// ** mui
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
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

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '30vw',
  },
}))

const AdminArticleNew: NextPageType = ({}: PageProps) => {
  const [categoryQueryParams, setCategoryQueryParams] =
    useState<ListQueryModel>({
      s: '',
      sType: 'title',
    })

  const { categoriesQuery } = useCategoryQuery(categoryQueryParams)
  const categories = categoriesQuery(
    categoryQueryParams.s !== '' ? true : false,
  )
  const [categoryValue, setCategoryValue] = useState<CategoryModel[]>([])

  const [categorySearchText, setCategorySearchText] = useState('')

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

  return (
    <Stack spacing={1.8}>
      <Editor />
      {/* 
      <StyledDrawer
        // className={classes.drawer}
        variant={'permanent'}
        // classes={{
        //   paper: classes.drawerPaper,
        //   docked: classes.drawerPaper,
        // }}
        anchor="right"
        open={true}
      >
        <p>test</p>
      </StyledDrawer> */}
      <TextField
        fullWidth
        type="text"
        id="title"
        label="Başlık"
        variant="outlined"
        size="small"
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

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={values.isShow}
              onChange={(e, checked) => setFieldValue('isShow', checked)}
            />
          }
          label={values.isShow ? 'Aktif' : 'Pasif'}
        />
      </FormGroup>
    </Stack>
  )

  return <></>
}

AdminArticleNew.layout = LayoutAdminPage
export default AdminArticleNew

export { getServerSideProps }
