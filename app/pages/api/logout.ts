import { NextApiResponse, NextApiRequest } from 'next'
import Cookie from '@/utils/Cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { removeCookie } = Cookie(req, res)
  if (req.method === 'POST') {
    removeCookie('auth')
    res.status(200).end()
  }
  return res.status(404).end()
}
