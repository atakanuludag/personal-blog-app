import axios from 'axios'
import LoginFormModel from '@/models/LoginFormModel'

const serviceBaseUrl = `/api`

const NextService = {
  login: async (data: LoginFormModel): Promise<void> =>
    axios.post(`${serviceBaseUrl}/login`, { data }).then((res) => res.data),
  logout: async (): Promise<void> =>
    axios.post(`${serviceBaseUrl}/logout`).then((res) => res.data),
}

Object.freeze(NextService)

export default NextService
