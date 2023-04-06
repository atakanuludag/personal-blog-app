// ** third party
import axios from 'axios'

// ** models
import LoginFormModel from '@/models/LoginFormModel'
import { PaletteMode } from '@/models/enums'

const serviceBaseUrl = `/api`

const NextService = {
  login: async (data: LoginFormModel): Promise<void> =>
    axios.post(`${serviceBaseUrl}/login`, { ...data }).then((res) => res.data),
  logout: async (): Promise<void> =>
    axios.post(`${serviceBaseUrl}/logout`).then((res) => res.data),
  changeThemeMode: async (themeMode: PaletteMode): Promise<void> =>
    axios
      .post(`${serviceBaseUrl}/themeMode`, { themeMode })
      .then((res) => res.data),
}

Object.freeze(NextService)

export default NextService
