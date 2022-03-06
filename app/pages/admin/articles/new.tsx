import React, { useState, useEffect } from 'react'
import { NextPage } from 'next/types'
import moment from 'moment'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import IPageProps from '@/models/IPageProps'
import LayoutAdminPage from '@/layouts/LayoutAdminPage'
import getServerSideProps from '@/utils/AdminServerSideProps'
import { INewArticle } from '@/models/IArticle'

type AdminComponent = NextPage<IPageProps> & {
  layout: typeof LayoutAdminPage
}

const AdminArticleNew: AdminComponent = ({ settings }: IPageProps) => {
  const initialValues: INewArticle = {
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

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } =
    useFormik<INewArticle>({
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
    <>
      <TextField
        type="text"
        id="title"
        label="Başlık"
        variant="outlined"
        disabled={isSubmitting}
        {...getFieldProps('title')}
        helperText={errors.title && touched.title ? errors.title : null}
        error={errors.title ? touched.title : false}
        fullWidth
      />
    </>
  )

  return <></>
}

AdminArticleNew.layout = LayoutAdminPage
export default AdminArticleNew

export { getServerSideProps }
