import axios from '@/core/Axios'
import ILoginForm from '@/models/ILoginForm'
import IToken from '@/models/IToken'

const postLogin = async (data: ILoginForm): Promise<IToken | null> => {
  try {
    const ret = await axios.post(`/user/login`, data)
    const tokenData: IToken = ret.data
    if (!tokenData) return null
    return tokenData
  } catch (err) {
    console.log('[LoginService] login() Error: ', err)
    return null
  }
}

const service = {
  postLogin,
}

export default service
