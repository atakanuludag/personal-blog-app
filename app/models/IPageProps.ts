import { AppInitialProps } from 'next/app'
import { DehydratedState } from 'react-query'
import ISettings from '@/models/ISettings'

export default interface IPageProps {
  settings: ISettings
  dehydratedState: DehydratedState
}
