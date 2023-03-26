// ** axios
import axios, { AxiosError, CreateAxiosDefaults } from 'axios'
export type { AxiosError } from 'axios'

// ** config
import { API_URL } from '@/config'

// ** services
import NextService from '@/services/NextService'

const defaultOptions: CreateAxiosDefaults = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

const instance = axios.create(defaultOptions)

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    switch (error.response?.status) {
      case 401:
        if (typeof window === 'undefined') break
        const pathname = window.location.pathname
        const redirectUrl = !pathname.includes('login') ? pathname : null
        await NextService.logout()
        window.location.href = `/admin/login${
          redirectUrl ? `?redirectUrl=${redirectUrl}` : ''
        }`
        break
      default:
        break
    }
    return Promise.reject()
  },
)

export const axiosSetTokenInterceptor = (token: string) => {
  instance.interceptors.request.use((config) => {
    if (!config?.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`,
      )
    }
    //console.log('trigger axiosSetTokenInterceptor()')
    config.headers['Authorization'] = token ? `Bearer ${token}` : ''
    return config
  })
}

export const axiosRemoveTokenInterceptor = () => {
  instance.interceptors.request.use((config) => {
    if (!config?.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`,
      )
    }
    delete config.headers['Authorization']
    return config
  })
}

export default instance
