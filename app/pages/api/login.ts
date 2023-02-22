// ** next
import { NextApiResponse, NextApiRequest } from 'next'

// ** third party
import moment from 'moment'

// ** models
import LoginFormModel from '@/models/LoginFormModel'

// ** services
import LoginService from '@/services/LoginService'

// ** utils
import Cookie from '@/utils/Cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { setCookie } = Cookie(req, res)
  if (req.method === 'POST') {
    const body: LoginFormModel = req.body
    if (!body) return res.status(500).end()

    const data = await LoginService.postLogin(body)
    if (!data) return res.status(500).end()

    setCookie('auth', data, moment().add(7, 'days').toDate())
    res.status(200).end()
  }
  return res.status(404).end()
}
