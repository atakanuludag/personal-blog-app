import axios from '@/core/Axios'
import LoginFormModel from '@/models/LoginFormModel'
import TokenModel from '@/models/TokenModel'

const postLogin = async (data: LoginFormModel): Promise<TokenModel | null> => {
  try {
    const ret = await axios.post(`/user/login`, data)
    const tokenData: TokenModel = ret.data
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
