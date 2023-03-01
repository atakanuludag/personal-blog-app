// ** mui
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'

// ** icons
import WarningIcon from '@mui/icons-material/Warning'
import DoneIcon from '@mui/icons-material/Done'

// ** third party
import { useFormik } from 'formik'
import * as Yup from 'yup'

// ** models
import { CategoryFormModel } from '@/models/CategoryModel'
import { useEffect, useState } from 'react'

// ** services
import CategoryService from '@/services/CategoryService'

// ** hooks
import useComponentContext from '@/hooks/useComponentContext'

import AsyncAutocomplete from 'components/AsyncAutocomplete'

type NewEditCategoryProps = {}

export default function NewEditCategory({}: NewEditCategoryProps) {
  const { formDrawer } = useComponentContext()

  const [guidExistsLoading, setGuidExistsLoading] = useState(false)
  const [guidExists, setGuidExists] = useState<boolean | null>(null)

  const initialValues: CategoryFormModel = {
    title: '',
    description: '',
    guid: '',
    parent: null,
  }

  // form validate
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Zorunlu alan'),
    description: Yup.string().required('Zorunlu alan'),
    guid: Yup.string().required('Zorunlu alan'),
    parent: Yup.string().optional(),
  })

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
  } = useFormik<CategoryFormModel>({
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

  useEffect(() => {
    if (formDrawer.submit) {
      console.log('submit oldu')
    }
  }, [formDrawer.submit])

  useEffect(() => {
    // const guidExists = async () => {
    //   const response = await CategoryService.guidExists(values.guid)
    //   setGuidExistsLoading(false)
    //   setGuidExists(response)
    // }

    // ** Güncelleme işlemide zaten yazmış olduğu guidi tekrar kontrol edip hataya düşmesini engellemek için;
    // if (id && initialValues.guid === values.guid) {
    //   setGuidExistsLoading(false)
    //   setGuidExists(false)
    //   return
    // }

    const delayDebounceFn = setTimeout(async () => {
      if (values.guid) {
        setGuidExistsLoading(true)
        const response = await CategoryService.guidExists(values.guid)
        setTimeout(() => {
          setGuidExistsLoading(false)
          setGuidExists(response)
        }, 500)
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [values.guid])

  return (
    <Stack spacing={2}>
      <TextField
        fullWidth
        required
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
        required
        multiline
        rows={2}
        label="Açıklama"
        variant="outlined"
        size="small"
        disabled={isSubmitting}
        {...getFieldProps('description')}
        helperText={
          errors.description && touched.title ? errors.description : null
        }
        error={errors.description ? touched.description : false}
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
                  <DoneIcon color="success" />
                ) : (
                  <Tooltip
                    title="Eklemeye çalıştığınız guid bilgisi zaten kullanılıyor."
                    placement="top"
                  >
                    <WarningIcon color="error" />
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

      {/* <AsyncAutocomplete
        name="parent"
        value={!values[i] ? '' : values[i].value}
        label={title}
        handleInputChange={handlePageAutoCompleteInputChange}
        handleChange={(e, val) => {
          let _values = values
          _values[i].value = val as any
          setValues([..._values])
        }}
        data={[]}
        // data={!page.data ? [] : page.data.results}
        objName="title"
        loading={page.isLoading}
        helperText={errors.parent && touched.parent ? errors.parent : null}
        error={errors.parent ? touched.parent : false}
      /> */}
    </Stack>
  )
}
