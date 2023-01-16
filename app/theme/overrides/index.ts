import { Theme } from '@mui/material'
import { merge } from 'lodash'
import Button from '@/theme/overrides/Button'

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return merge(Button(theme))
}
