import { ValueType } from '@/models/enums'

export interface ISettingItem {
  id: string
  name: string
  title: string
  value: string
  type: ValueType
}

export default interface ISettings {
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
}
