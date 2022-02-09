export enum ESettings {
  SiteUrl = 'siteUrl',
  SiteTitle = 'siteTitle',
  SiteDescription = 'siteDescription',
  PersonDisplayName = 'personDisplayName',
  PersonDescription = 'personDescription',
  PersonTwitterUrl = 'personTwitterUrl',
  PersonInstagramUrl = 'personInstagramUrl',
  PersonGithubUrl = 'personGithubUrl',
  PersonLinkedinUrl = 'personLinkedinUrl',
  AdminMail = 'adminMail',
  PageSize = 'pageSize',
}

export enum ESettingsType {
  SiteUrl = 'text',
  SiteTitle = 'text',
  SiteDescription = 'text',
  PersonDisplayName = 'text',
  PersonDescription = 'multiline',
  PersonTwitterUrl = 'url',
  PersonInstagramUrl = 'url',
  PersonGithubUrl = 'url',
  PersonLinkedinUrl = 'url',
  AdminMail = 'email',
  PageSize = 'number',
}
