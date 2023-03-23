// ** react
import { SyntheticEvent, useState } from 'react'

// ** third party
import { FormikErrors, FormikTouched } from 'formik/dist/types'

// ** mui
import TextField from '@mui/material/TextField'
import Autocomplete, {
  AutocompleteChangeReason,
} from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'

type AsyncAutocompleteProps = {
  multiple?: boolean
  name: string
  value: any
  label: string
  handleInputChange: (e: SyntheticEvent<Element, Event>, val: string) => void
  handleChange: (
    e: SyntheticEvent<Element, Event>,
    val: any | any[],
    reason: AutocompleteChangeReason,
  ) => void
  data: any
  objName: string
  loading: boolean
  helperText?: string | null
  error?: boolean
  inputValue: string
  setTouched?: (
    touched: FormikTouched<any>,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<any>>
}

export default function AsyncAutocomplete({
  multiple = false,
  name,
  value,
  label,
  handleInputChange,
  handleChange,
  data,
  objName,
  loading,
  helperText = null,
  error = false,
  inputValue,
  setTouched,
  ...props
}: AsyncAutocompleteProps) {
  const [open, setOpen] = useState(false)

  return (
    <Autocomplete
      id="asynchronous-autocomplete"
      multiple={multiple}
      fullWidth
      size="small"
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      isOptionEqualToValue={(option: any, value: any) =>
        option[objName] === value[objName]
      }
      getOptionLabel={(option) => option[objName]}
      value={value}
      onInputChange={handleInputChange}
      inputValue={inputValue}
      onChange={handleChange}
      options={data}
      loading={loading}
      loadingText="Yükleniyor..."
      noOptionsText="Veri bulunamadı. Aramanızı genişletin."
      onBlur={() => setTouched && setTouched({ [name]: true })}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          helperText={helperText}
          error={error}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      {...props}
    />
  )
}
