import React, { useState, useEffect } from 'react'
import { NextPage } from 'next/types'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import IPageProps from '@/models/IPageProps'
import { ValueType } from '@/models/enums'
import LayoutAdminPage from '@/layouts/LayoutAdminPage'
import getServerSideProps from '@/utils/AdminServerSideProps'
import ISettings, { ISettingItem } from '@/models/ISettings'
import useSettingQuery from '@/hooks/queries/useSettingQuery'
import Loading from '@/components/Loading'
import { useMutation } from 'react-query'
import SettingService from '@/services/SettingService'

import { useFormik } from 'formik'
import * as Yup from 'yup'

type AdminComponent = NextPage<IPageProps> & {
  layout: typeof LayoutAdminPage
}

const AdminSettings: AdminComponent = ({}: IPageProps) => {
  //IPageProps  settings
  const { settingsQuery } = useSettingQuery()
  const { data, isSuccess, isLoading, isFetching } = settingsQuery()

  // form validate
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Lütfen kullanıcı adını giriniz.'),
    password: Yup.string().required('Lütfen şifrenizi giriniz.'),
  })

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } =
    useFormik<ISettingItem[]>({
      initialValues: [],
      validationSchema,
      onSubmit: async (values, { setSubmitting, resetForm }) => {
        try {
          settingsUpdate.mutate(values)

          // await axios.post(`/api/login`, values)
          // enqueueSnackbar('Başarıyla giriş yapıldı.', {
          //   variant: 'success',
          // })
          // router.push('/admin')
        } catch (err) {
          // console.error(`Admin login page onSubmit() Error: ${err}`)
          // enqueueSnackbar('Giriş yapılırken bir sorun oluştu.', {
          //   variant: 'error',
          // })
        }
        setSubmitting(false)
        resetForm()
      },
    })

  const settingsUpdate = useMutation(SettingService.postItems, {
    onSuccess: (data) => {
      console.log(data)
      const message = 'success'
      alert(message)
    },
    onError: () => {
      alert('there was an error')
    },
    onSettled: () => {
      //queryClient.invalidateQueries('create');
    },
  })

  if (!isSuccess || !data) return <p>loading</p>

  return (
    <Box component="div">
      <form method="post" onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          {data.map((d, i) => (
            <TextField
              key={i}
              type={d.type === ValueType.Multiline ? ValueType.Text : d.type}
              id={d.id}
              label={d.title}
              value={d.value}
              variant="outlined"
              fullWidth
              multiline={d.type === ValueType.Multiline}
            />
          ))}
        </Stack>

        <LoadingButton type="submit" loading={false} variant="outlined">
          Kaydet
        </LoadingButton>
      </form>
    </Box>
  )
}

AdminSettings.layout = LayoutAdminPage
export default AdminSettings

export { getServerSideProps }
