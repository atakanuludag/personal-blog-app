import axios from '@/core/Axios'
import SettingsModel, { SettingItemModel } from '@/models/SettingsModel'

const serviceBaseUrl = `/settings`

const SettingService = {
  getItems: async (): Promise<SettingItemModel[]> => {
    try {
      const ret = await axios.get(`${serviceBaseUrl}`)
      return ret.data ? ret.data : []
    } catch (err) {
      console.log('[SettingService] getItems() Error: ', err)
      return {} as any
    }
  },
  postItems: async (data: SettingItemModel[]): Promise<SettingItemModel[]> => {
    try {
      const ret = await axios.post(`${serviceBaseUrl}`, data)
      return ret.data ? ret.data : []
    } catch (err) {
      console.log('[SettingService] postItems() Error: ', err)
      return {} as any
    }
  },
  getItemsAsObject: async (): Promise<SettingsModel> => {
    try {
      const ret = await SettingService.getItems()
      let data = {} as SettingsModel
      ret.forEach((s: SettingItemModel) => {
        data = {
          ...data,
          [s.name]: isNaN(Number(s.value)) ? s.value : Number(s.value),
        }
      })
      return data
    } catch (err) {
      console.log('[SettingService] getItemsAsObject() Error: ', err)
      return {} as any
    }
  },
}

Object.freeze(SettingService)

export default SettingService
