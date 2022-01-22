import axios from '../core/Axios'
import ILoginForm from '@/models/ILoginForm'
import IToken from '@/models/IToken'

const postApiLogin = async (data: ILoginForm): Promise<IToken> => {
  try {
    const ret = await axios.post(`/user/login`, data)
    let tokenData: IToken = !ret.data ? ({} as IToken) : ret.data
    return tokenData
  } catch (err) {
    console.log('[LoginService] login() Error: ', err)
    return {} as any
  }
}

export { postApiLogin }
