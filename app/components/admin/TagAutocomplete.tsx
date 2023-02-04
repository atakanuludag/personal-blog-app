// ** react
import { Dispatch, SetStateAction, useState } from 'react'

// ** mui
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete, {
  AutocompleteChangeReason,
} from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'

// ** hooks
import useTagQuery from '@/hooks/queries/useTagQuery'
import useDebounce from '@/hooks/useDebounce'

// ** model
import IListQuery from '@/models/IListQuery'
import TagModel from '@/models/Tag'

interface TagAutocompleteProps {
  select: (string | TagModel)[]
  setSelect: Dispatch<SetStateAction<(string | TagModel)[]>>
}

function TagAutocomplete({
  select,
  setSelect,
  ...props
}: TagAutocompleteProps) {
  const [params, setParams] = useState<IListQuery>({
    s: '',
    sType: 'title',
  })

  const debouncedValue = useDebounce<IListQuery>(params, 500)
  const { tagQuery } = useTagQuery(debouncedValue)
  const { data, isLoading, isFetching } = tagQuery({
    enabled: debouncedValue.s === '' ? false : true,
  })

  const loading = isLoading || isFetching

  const handleInputChange = (e: any, value: string) =>
    setParams({ ...params, s: value })

  const handleChange = (
    e: any,
    val: (string | TagModel)[],
    reason: AutocompleteChangeReason,
  ) => {
    setSelect([...val])
  }
  //  getOptionLabel={(option) => typeof option === "string" ? option : option?.title}
  return (
    <Autocomplete
      multiple
      freeSolo
      id="tags"
      loading={loading}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option?.title
      }
      options={(data || []) as any}
      // defaultValue={undefined}
      onInputChange={handleInputChange}
      value={select}
      noOptionsText="Herhangi bir veri bulunamadı. Aramanızı genişletin veya elle içerik ekleyin."
      loadingText=""
      onChange={handleChange}
      renderOption={(props, option) => (
        <MenuItem
          {...props}
          component="li"
          selected={select.some((a) =>
            typeof a !== 'string' && typeof option !== 'string'
              ? a._id === option._id
              : false,
          )}
        >
          {typeof option === 'string' ? option : option?.title}
        </MenuItem>
      )}
      renderTags={(value: readonly (TagModel | string)[], getTagProps) =>
        value.map((option: any, index: number) => (
          <Chip
            variant="outlined"
            label={typeof option === 'string' ? option : option.title}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          size="small"
          label="Etiketler"
          placeholder=""
        />
      )}
    />
  )
}

export default TagAutocomplete
