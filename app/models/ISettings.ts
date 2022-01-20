export interface ISettingItem {
  readonly id: string
  readonly name: string
  readonly value: string
}

export default interface ISettings {
  readonly siteUrl: string
  readonly siteTitle: string
  readonly description: string
  readonly adminMail: string
  readonly pageSize: number
}
