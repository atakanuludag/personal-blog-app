import axios from '@/core/Axios'
import ISettings, { ISettingItem } from '@/models/ISettings'

const getItems = async (): Promise<ISettingItem[]> => {
  try {
    const ret = await axios.get(`/settings`)
    return ret.data ? ret.data : []
  } catch (err) {
    console.log('[SettingService] getItems() Error: ', err)
    return {} as any
  }
}

const postItems = async (data: ISettingItem[]): Promise<ISettingItem[]> => {
  try {
    const ret = await axios.post(`/settings`, data)
    return ret.data ? ret.data : []
  } catch (err) {
    console.log('[SettingService] postItems() Error: ', err)
    return {} as any
  }
}

const getItemsAsObject = async (): Promise<ISettings> => {
  try {
    const ret = await getItems()
    let data = {} as ISettings
    ret.forEach((s: ISettingItem) => {
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
}

const service = {
  getItems,
  getItemsAsObject,
  postItems,
}

export default service
