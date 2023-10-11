// ** react
import { useEffect, useState } from 'react'

// ** mui
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'

// ** icons
import WarningIcon from '@mui/icons-material/Warning'
import DoneIcon from '@mui/icons-material/Done'

// ** third party
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useQueryClient } from 'react-query'

// ** models
import { TagFormModel } from '@/models/TagModel'

// ** services
import TagService from '@/services/TagService'

// ** hooks
import useComponentContext from '@/hooks/useComponentContext'

// ** core
import { QUERY_NAMES } from '@/core/Constants'

// ** utils
import slugify from '@/utils/Slugify'

type NewEditTagProps = {
  data?: TagFormModel
}

export default function NewEditTag({ data }: NewEditTagProps) {
  const { formDrawer, handleFormDrawerClose, setFormDrawerData } =
    useComponentContext()
  const { enqueueSnackbar } = useSnackbar()
  const queryClientHook = useQueryClient()

  const [initialValues, setInitialValues] = useState<TagFormModel>({
    title: '',
    guid: '',
  })

  const [guidExistsLoading, setGuidExistsLoading] = useState(false)
  const [guidExists, setGuidExists] = useState<boolean | null>(null)

  // form validate
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Zorunlu alan'),
    guid: Yup.string().required('Zorunlu alan'),
  })

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setValues,
    setFieldValue,
    isValid,
    values,
  } = useFormik<TagFormModel>({
    initialValues,
    validationSchema,
    validateOnMount: data?._id ? false : true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        let text = ''
        if (values._id) {
          await TagService.patchItem(values)
          text = 'Kayıt başarıyla düzenlendi.'
        } else {
          await TagService.postItem(values)
          text = 'Kayıt başarıyla eklendi.'
        }
        enqueueSnackbar(text, {
          variant: 'success',
        })
        queryClientHook.invalidateQueries(QUERY_NAMES.TAG)
      } catch (err) {
        enqueueSnackbar(
          'Kayıt eklenirken veya güncellenirken bir hata oluştu.',
          {
            variant: 'error',
          },
        )
      }
      handleFormDrawerClose()
      setSubmitting(false)
      resetForm()
    },
  })

  useEffect(() => {
    if (values.title !== initialValues.title && !initialValues._id) {
      setFieldValue('guid', slugify(values.title))
    }
  }, [values.title])

  useEffect(() => {
    if (!data) return
    setInitialValues(data)
    setValues(data)
  }, [data])

  useEffect(() => {
    setFormDrawerData({
      ...formDrawer,
      submitDisabled: !isValid || guidExistsLoading || guidExists === true,
    })
  }, [isValid, guidExistsLoading, guidExists])

  useEffect(() => {
    if (formDrawer.submit) handleSubmit()
  }, [formDrawer.submit])

  useEffect(() => {
    if (values._id && initialValues.guid === values.guid) {
      setGuidExistsLoading(false)
      setGuidExists(false)
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      if (values.guid) {
        setGuidExistsLoading(true)
        const response = await TagService.guidExists(values.guid)
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
    </Stack>
  )
}
