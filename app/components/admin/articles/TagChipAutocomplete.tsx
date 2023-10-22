// ** react
import { useState } from 'react'

// ** mui
import TextField from '@mui/material/TextField'
import Autocomplete, {
  AutocompleteChangeReason,
} from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'

type TagChipAutocompleteProps = {
  selected: string[]
  setSelected: (data: string[]) => void
}

export default function TagChipAutocomplete({
  selected,
  setSelected,
  ...props
}: TagChipAutocompleteProps) {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (
    e: any,
    val: string[],
    reason: AutocompleteChangeReason,
  ) => {
    setSelected([...val])
  }

  return (
    <Autocomplete
      {...props}
      multiple
      freeSolo
      id="tags"
      options={[]}
      onChange={handleChange}
      value={selected}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        const options = newInputValue.split(',')

        if (options.length > 1) {
          setSelected(
            selected
              .concat(options)
              .map((x) => x.trim())
              .filter((x) => x),
          )
          setInputValue('')
        } else {
          setInputValue(newInputValue)
        }
      }}
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          // eslint-disable-next-line react/jsx-key
          <Chip
            variant="outlined"
            size="small"
            label={option}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          variant="outlined"
          label="Etiket ekle"
          placeholder=""
        />
      )}
    />
  )
}
