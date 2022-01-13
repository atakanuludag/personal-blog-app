import axios from '../core/Axios'
import ISetting from '@/models/ISetting'

export default class SettingService {
  // getItemByName = async (name: string): Promise<ISetting> => {
  //   try {
  //     const ret = await axios.get(`/setting`, {
  //       params: {
  //         name,
  //       },
  //     })
  //     return ret.data
  //   } catch (err) {
  //     //const error: AxiosError = err;
  //     console.log('[SettingService] getItems() Error: ', err)
  //     return {} as any
  //   }
  // }

  getItems = async (): Promise<ISetting[]> => {
    try {
      const ret = await axios.get(`/setting`)
      return ret.data
    } catch (err) {
      //const error: AxiosError = err;
      console.log('[SettingService] getItems() Error: ', err)
      return {} as any
    }
  }
}
