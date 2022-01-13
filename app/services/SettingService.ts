import axios, { AxiosError } from '../core/Axios'
import ISetting from '@/models/ISetting'
/*import IDHItem from '../interfaces/IDHItem'
import ILoginForm from '../interfaces/ILoginForm'
import IAuth from '../interfaces/IAuth'
import IServiceResponse from '../interfaces/IServiceResponse'
*/

/*
export const initialItemValue: IDHItem = {
    id: "",
    title: "",
    content:  "",
    date: "",
    guid: "",
    link: "",
    previewLink: "",
    topicId: "",
    likeCount: 0
}*/

export default class SettingService {
  getItemByName = async (name: string): Promise<ISetting> => {
    try {
      const ret = await axios.get(`/setting`, {
        params: {
          name,
        },
      })
      return ret.data
    } catch (err) {
      //const error: AxiosError = err;
      console.log('[ArticleService] getItems() Error: ', err)
      return {} as any
    }
  }
}
