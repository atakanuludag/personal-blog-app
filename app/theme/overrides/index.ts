import { Theme } from '@mui/material'
import { merge } from 'lodash'
import Button from '@/theme/overrides/Button'
import Link from '@/theme/overrides/Link'

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return merge(Button(theme), Link(theme))
}
