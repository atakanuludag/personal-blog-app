import React, { useState } from 'react'
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
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import LoadingButton from '@mui/lab/LoadingButton'
import LayoutFullPage from '@/layouts/LayoutFullPage'
import IPageProps from '@/models/IPageProps'
import ILoginForm from '@/models/ILoginForm'
import IToken from '@/models/IToken'
import Cookie from '@/utils/Cookie'

type AdminComponent = NextPage<IPageProps> & {
  layout: typeof LayoutFullPage
}

const Wrapper = styled(Box)(() => ({
  width: '100%',
}))

const LoginBox = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(5),
  width: '50vw',
  display: 'flex',
  justifyContent: 'center',
}))

const Form = styled('form')(() => ({
  width: '100%',
}))

const AdminLogin: AdminComponent = ({}: IPageProps) => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [showPassword, setShowPassword] = useState(false)
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

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) =>
    e.preventDefault()

  return (
    <Box display="flex" justifyContent="center">
      <LoginBox elevation={5}>
        <Form method="post" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <Typography variant="h4">Giriş Yap</Typography>
            <Typography
              variant="subtitle1"
              sx={{ margin: '5px 0px 10px 0px !important' }}
            >
              Admin panele buradan giriş yapabilirsiniz.
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

            <FormControl variant="outlined">
              <InputLabel htmlFor="password">Şifre</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...getFieldProps('password')}
                error={errors.password ? touched.password : false}
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Şifre"
              />
              <FormHelperText>
                {errors.password && touched.password ? errors.password : null}
              </FormHelperText>
            </FormControl>

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
    </Box>
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
