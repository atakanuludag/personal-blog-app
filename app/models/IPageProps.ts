import { DehydratedState } from 'react-query'
import ISettings from '@/models/ISettings'
import IToken from '@/models/IToken'

export default interface IPageProps {
  settings: ISettings
  auth: IToken | undefined
  dehydratedState: DehydratedState
}
