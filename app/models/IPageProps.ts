import { DehydratedState } from 'react-query'
import ISettings from '@/models/ISettings'
import IToken from '@/models/IToken'

type GeneralPageProps = {
  settings: ISettings
  userIpAdress: string
  auth: IToken | undefined
  dehydratedState: DehydratedState
}
export default GeneralPageProps
