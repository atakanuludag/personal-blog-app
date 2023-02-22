import { ValueType } from '@/models/enums'
import IPage from '@/models/PageModel'

export interface SettingItemModel {
  id: string
  name: string
  title: string
  value: string
  type: ValueType
}

export default interface SettingsModel {
  readonly siteUrl: string
  readonly siteTitle: string
  readonly siteDescription: string
  readonly personDisplayName: string
  readonly personDescription: string
  readonly personTwitterUrl: string
  readonly personInstagramUrl: string
  readonly personGithubUrl: string
  readonly personLinkedinUrl: string
  readonly adminMail: string
  readonly pageSize: number
  readonly navbarPages: IPage[]
}
