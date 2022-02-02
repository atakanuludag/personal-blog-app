import { IncomingMessage, ServerResponse } from 'http'
import Cookies from 'cookies'

export default function Cookie(
  req: IncomingMessage | undefined,
  res: ServerResponse | undefined,
) {
  let cookies: Cookies | null = null

  if (req && res) cookies = new Cookies(req, res)

  const setCookie = (name: string, data: any) =>
    cookies &&
    cookies.set(name, typeof data === 'object' ? JSON.stringify(data) : data, {
      httpOnly: true,
    })

  const getCookie = (name: string, isParse: boolean = false) => {
    if (!cookies) return null
    const data: any = cookies.get(name)
    if (!data) return null
    if (isParse) return JSON.parse(data)
    return data
  }

  return {
    setCookie,
    getCookie,
  }
}
