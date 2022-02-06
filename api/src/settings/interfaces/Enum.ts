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
  SiteUrl = 'string',
  SiteTitle = 'string',
  SiteDescription = 'string',
  PersonDisplayName = 'string',
  PersonDescription = 'string',
  PersonTwitterUrl = 'link',
  PersonInstagramUrl = 'link',
  PersonGithubUrl = 'link',
  PersonLinkedinUrl = 'link',
  AdminMail = 'email',
  PageSize = 'number',
}
