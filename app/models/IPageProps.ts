import { DehydratedState } from 'react-query'
import ISettings from '@/models/ISettings'
import IToken from '@/models/IToken'

export default interface IPageProps {
  settings: ISettings
  userIpAdress: string
  auth: IToken | undefined
  dehydratedState: DehydratedState
}
