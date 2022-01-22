import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import LayoutFullPage from '@/layouts/LayoutFullPage'
import useStoreSettings from '@/hooks/useStoreSettings'
import IPageProps from '@/models/IPageProps'
import ILoginForm from '@/models/ILoginForm'
import { postApiLogin } from '@/services/LoginService'
import { setLocalStorage } from '@/utils/LocalStorage'
import { LOCAL_STORAGES } from '@/core/Constants'

type AdminLoginComponent = NextPage<IPageProps> & {
  layout: typeof LayoutFullPage
}

const LoginBox = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(5),
  display: 'flex',
  justifyContent: 'center',
}))

const Form = styled('form')(({ theme }) => ({
  ...theme.typography.body2,
  width: '50%',
}))

const AdminLogin: AdminLoginComponent = ({ settings }: IPageProps) => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { settingsStore, setSettingsStore } = useStoreSettings()

  const initialValues: ILoginForm = {
    username: '',
    password: '',
  }

  useEffect(() => {
    if (settingsStore.isLogin) router.push('/admin')
  }, [])

  // form validate
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Lütfen kullanıcı adını giriniz.'),
    password: Yup.string().required('Lütfen şifrenizi giriniz.'),
  })

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } =
    useFormik<ILoginForm>({
      initialValues,
      validationSchema,
      onSubmit: async (values, { setSubmitting, resetForm }) => {
        try {
          const data = await postApiLogin(values)
          const { accessToken, userId } = data
          setSettingsStore({
            ...settingsStore,
            isLogin: true,
            accessToken,
            userId,
          })
          setLocalStorage(LOCAL_STORAGES.LS_AUTH, data)
          enqueueSnackbar('Başarıyla giriş yapıldı.', {
            variant: 'success',
          })
          router.push('/admin')
        } catch (err) {
          console.error(`Admin login page onSubmit() Error: ${err}`)
          enqueueSnackbar('Giriş yapılırken bir sorun oluştu.', {
            variant: 'error',
          })
        }
        setSubmitting(false)
        resetForm()
      },
    })

  return (
    <LoginBox elevation={24}>
      <Form onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <Typography variant="h4" component="div" gutterBottom>
            Admin Panel Login
          </Typography>
          <TextField
            type="text"
            id="username"
            label="Kullanıcı Adı"
            variant="outlined"
            disabled={isSubmitting}
            {...getFieldProps('username')}
            helperText={
              errors.username && touched.username ? errors.username : null
            }
            error={errors.username ? touched.username : false}
            fullWidth
          />

          <TextField
            type="password"
            id="password"
            label="Şifre"
            variant="outlined"
            {...getFieldProps('password')}
            disabled={isSubmitting}
            helperText={
              errors.password && touched.password ? errors.password : null
            }
            error={errors.password ? touched.password : false}
            fullWidth
          />

          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            type="submit"
          >
            Giriş
          </LoadingButton>
        </Stack>
      </Form>
    </LoginBox>
  )
}

AdminLogin.layout = LayoutFullPage
export default AdminLogin
