import axios, { AxiosSetTokenInterceptor } from '@/core/Axios'
import ILoginForm from '@/models/ILoginForm'
import IToken from '@/models/IToken'

const postApiLogin = async (data: ILoginForm): Promise<IToken | null> => {
  try {
    const ret = await axios.post(`/user/login`, data)
    const tokenData: IToken = ret.data
    if (tokenData) {
      AxiosSetTokenInterceptor(tokenData.accessToken)
      return tokenData
    }
    return null
  } catch (err) {
    console.log('[LoginService] login() Error: ', err)
    return {} as any
  }
}

export { postApiLogin }
