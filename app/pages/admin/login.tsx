import React from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps, NextPage } from 'next/types'
import axios from 'axios'
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
import IPageProps from '@/models/IPageProps'
import ILoginForm from '@/models/ILoginForm'
import IToken from '@/models/IToken'
import Cookie from '@/utils/Cookie'

type AdminComponent = NextPage<IPageProps> & {
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

const AdminLogin: AdminComponent = ({}: IPageProps) => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const initialValues: ILoginForm = {
    username: 'atakanuludag',
    password: '123456',
  }

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
          await axios.post(`/api/login`, values)
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
      <Form method="post" onSubmit={handleSubmit} noValidate>
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { getCookie } = Cookie(req, res)
  const auth: IToken | null = getCookie('auth', true)

  if (!auth) {
    return {
      props: {},
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: '/admin',
    },
  }
}

AdminLogin.layout = LayoutFullPage
export default AdminLogin
