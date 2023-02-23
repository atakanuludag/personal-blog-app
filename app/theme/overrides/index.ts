// ** third party
import { merge } from 'lodash'

// ** mui
import { Theme } from '@mui/material'

// ** mui overrides
import CssBaseline from '@/theme/overrides/CssBaseline'
import Button from '@/theme/overrides/Button'
import Link from '@/theme/overrides/Link'
import ListItemButton from '@/theme/overrides/ListItemButton'

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return merge(
    CssBaseline(theme),
    Button(theme),
    Link(theme),
    ListItemButton(theme),
  )
}
