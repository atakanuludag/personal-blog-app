// ** third party
import { DehydratedState } from 'react-query'

// ** models
import PageModel from '@/models/PageModel'
import TokenModel from '@/models/TokenModel'
import CategoryModel from '@/models/CategoryModel'

type AppPropsModel = {
  dehydratedState: DehydratedState
  navbarPages: PageModel[]
  categories: CategoryModel[]
  userIpAdress: string
  auth?: TokenModel
}

export default AppPropsModel
