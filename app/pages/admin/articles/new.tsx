import React, { useState, useEffect } from 'react'
import { NextPage } from 'next/types'
import dynamic from 'next/dynamic'
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
import ListQueryModel from '@/models/ListQueryModel'

import TagModel from '@/models/TagModel'

import TagAutocomplete from '@/components/admin/articles/TagAutocomplete'
import NextPageType from '@/models/NextPageType'

const Editor = dynamic((): Promise<any> => import('@/components/editor'), {
  //besure to import dynamically
  ssr: false,
})

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '30vw',
  },
}))

const AdminArticleNew: NextPageType = ({ settings }: PageProps) => {
  const [params, setParams] = useState<ListQueryModel>({
    s: '',
    sType: 'title',
  })
  const { tagQuery } = useTagQuery(params)
  const { data, isSuccess, isLoading, isFetching } = tagQuery({
    enabled: params.s === '' ? false : true,
  })
  const loading = isLoading || isFetching

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
    title: Yup.string().required('test.'),
  })

  const [tagSelect, setTagSelect] = useState<(string | TagModel)[]>([])

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
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

  //https://github.com/stjerdev/draft-js-next-js/blob/master/components/editor/TextEditor.tsx
  return (
    <Stack spacing={1}>
      {/* <Editor /> */}
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
