export interface ISettingItem {
  readonly id: string
  readonly name: string
  readonly value: string
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
