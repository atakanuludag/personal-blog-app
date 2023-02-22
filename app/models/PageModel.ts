import ListResponseModel from '@/models/ListResponseModel'

export default interface PageModel {
  readonly _id: string
  readonly title: string
  readonly shortDescription: string
  readonly content: string
  readonly guid: string
  readonly publishingDate: Date
  readonly isShow: boolean
  readonly viewCount: number
}
export interface PageListResponseModel extends ListResponseModel {
  results: PageModel[]
}
