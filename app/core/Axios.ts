import axios from 'axios'
export type { AxiosError } from 'axios'
import { API_URL } from '@/config'

const defaultOptions = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

const instance = axios.create(defaultOptions)

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
