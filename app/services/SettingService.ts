import axios from '@/core/Axios'
import ISettings, { ISettingItem } from '@/models/ISettings'

export default class SettingService {
  getItems = async (): Promise<ISettings> => {
    try {
      const ret = await axios.get(`/settings`)
      let data = {} as ISettings
      ret.data.forEach((s: ISettingItem) => {
        data = {
          ...data,
          [s.name]: isNaN(Number(s.value)) ? s.value : Number(s.value),
        }
      })
      return data
    } catch (err) {
      console.log('[SettingService] getItems() Error: ', err)
      return {} as any
    }
  }
}
