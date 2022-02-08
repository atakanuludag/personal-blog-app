import { NextApiResponse, NextApiRequest } from 'next'
import ILoginForm from '@/models/ILoginForm'
import LoginService from '@/services/LoginService'
import Cookie from '@/utils/Cookie'
import moment from 'moment'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { setCookie } = Cookie(req, res)
  if (req.method === 'POST') {
    const body: ILoginForm = req.body
    if (!body) return res.status(500).end()

    const data = await LoginService.postLogin(body)
    if (!data) return res.status(500).end()

    setCookie('auth', data, moment().add(7, 'days').toDate())
    res.status(200).end()
  }
  return res.status(404).end()
}
