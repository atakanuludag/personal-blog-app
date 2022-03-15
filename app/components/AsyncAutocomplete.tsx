import { SyntheticEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'

interface IAsyncAutocompleteProps {
  name: string
  value: any
  label: string
  handleInputChange: (e: SyntheticEvent<Element, Event>, val: string) => void
  handleChange: (e: SyntheticEvent<Element, Event>, val: any[]) => void
  data: any
  objName: string
  loading: boolean
  helperText?: any
  error?: boolean
}

function AsyncAutocomplete({
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
  ...props
}: IAsyncAutocompleteProps) {
  const [open, setOpen] = useState(false)

  return (
    <Autocomplete
      id="asynchronous-autocomplete"
      multiple
      fullWidth
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
      value={!value ? [] : value}
      onInputChange={handleInputChange}
      onChange={handleChange}
      options={data}
      loading={loading}
      loadingText="Yükleniyor..."
      noOptionsText="Veri bulunamadı. Aramanızı genişletin."
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

//Todo: helpertext and error not working

export default AsyncAutocomplete
