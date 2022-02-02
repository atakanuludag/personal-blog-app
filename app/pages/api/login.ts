import { NextApiResponse, NextApiRequest } from 'next'
import ILoginForm from '@/models/ILoginForm'
import { postApiLogin } from '@/services/LoginService'
import Cookie from '@/utils/Cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { setCookie } = Cookie(req, res)
  if (req.method === 'POST') {
    const body: ILoginForm = req.body
    if (!body) return res.status(500).end()

    const data = await postApiLogin(body)
    if (!data) return res.status(500).end()

    setCookie('auth', data)
    res.status(200).end()
  }
  return res.status(404).end()
}
