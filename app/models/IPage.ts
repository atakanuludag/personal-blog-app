import IListResponse from '@/models/IListResponse'

export default interface IPage {
  readonly title: string
  readonly shortDescription: string
  readonly content: string
  readonly guid: string
  readonly publishingDate: Date
  readonly isShow: boolean
  readonly viewCount: number
}

export interface IPageResponse extends IListResponse {
  results: IPage[]
}
