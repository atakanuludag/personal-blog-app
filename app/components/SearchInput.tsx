// ** next
import { useRouter } from 'next/router'

// ** third party
import { useFormik } from 'formik'
import * as Yup from 'yup'

// ** mui
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'

// ** icons
import SearchIcon from '@mui/icons-material/Search'
import { useEffect } from 'react'

type FormProps = {
  searchText: string
}

export default function SearchInput({ ...props }) {
  const router = useRouter()

  const initialValues: FormProps = {
    searchText: '',
  }

  // form validate
  const validationSchema = Yup.object().shape({
    searchText: Yup.string().required(),
  })

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    resetForm,
  } = useFormik<FormProps>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (!values?.searchText) return
      router.push(`/search?s=${values.searchText}`)
    },
  })

  useEffect(() => {
    setFieldValue('searchText', (router?.query?.s as string) || '')
    if (!router?.query?.s) resetForm()
  }, [router?.query?.s])

  return (
    <FormControl
      {...props}
      variant="outlined"
      error={errors.searchText ? touched.searchText : false}
    >
      <InputLabel htmlFor="outlined-adornment-password">
        Site içinde ara...
      </InputLabel>
      <OutlinedInput
        {...getFieldProps('searchText')}
        type="text"
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => handleSubmit()} edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        label="Site içinde ara..."
      />
    </FormControl>
  )
}
