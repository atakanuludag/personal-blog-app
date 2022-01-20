import { ServerResponse } from 'http'

export default function ResponseHeader(res: ServerResponse) {
  const setHeader = (name: string, data: any) => {
    if (res)
      res.setHeader(
        name,
        typeof data === 'object' ? JSON.stringify(data) : data,
      )
  }

  const getHeader = (name: string, isParse: boolean = false) => {
    if (!res) return
    let data: any = res.getHeader(name)
    if (isParse) return JSON.parse(data)
    return data
  }

  return {
    setHeader,
    getHeader,
  }
}
