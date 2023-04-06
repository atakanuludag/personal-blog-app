// ** next
import { NextApiResponse, NextApiRequest } from 'next'

// ** utils
import Cookie from '@/utils/Cookie'

// ** utils
import { COOKIE_NAMES } from '@/core/Constants'

// ** utils
import { PaletteMode } from '@/models/enums'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method !== 'POST') return res.status(404).end()
  const body: { themeMode: PaletteMode } = req.body

  const { setCookie } = Cookie(req, res)

  setCookie(COOKIE_NAMES.THEME_MODE, body.themeMode)
  res.status(200).end()
}
