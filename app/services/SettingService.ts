import axios from '@/core/Axios'
import SettingsModel, { SettingItemModel } from '@/models/SettingsModel'

const getItems = async (): Promise<SettingItemModel[]> => {
  try {
    const ret = await axios.get(`/settings`)
    return ret.data ? ret.data : []
  } catch (err) {
    console.log('[SettingService] getItems() Error: ', err)
    return {} as any
  }
}

const postItems = async (
  data: SettingItemModel[],
): Promise<SettingItemModel[]> => {
  try {
    const ret = await axios.post(`/settings`, data)
    return ret.data ? ret.data : []
  } catch (err) {
    console.log('[SettingService] postItems() Error: ', err)
    return {} as any
  }
}

const getItemsAsObject = async (): Promise<SettingsModel> => {
  try {
    const ret = await getItems()
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
}

const service = {
  getItems,
  getItemsAsObject,
  postItems,
}

export default service
