// ** third party
import { DehydratedState } from 'react-query'

// ** models
import SettingsModel from '@/models/SettingsModel'
import TokenModel from '@/models/TokenModel'
import CategoryModel from '@/models/CategoryModel'

type AppPropsModel = {
  dehydratedState: DehydratedState
  settings: SettingsModel
  categories: CategoryModel[]
  userIpAdress: string
  auth?: TokenModel
}

export default AppPropsModel
