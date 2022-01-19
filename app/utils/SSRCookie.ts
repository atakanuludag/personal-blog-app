import { IncomingMessage, ServerResponse } from 'http'
import Cookies from 'cookies'

export default function SSRCookie(req: IncomingMessage, res: ServerResponse) {
  const cookies = new Cookies(req, res)

  const setCookie = async (name: string, data: any) =>
    cookies.set(name, typeof data === 'object' ? JSON.stringify(data) : data, {
      httpOnly: true,
    })

  const getCookie = (name: string, isParse: boolean = false) => {
    let data: any = cookies.get(name)
    if (isParse) return JSON.parse(data)
    return data
  }

  return {
    setCookie,
    getCookie,
  }
}
