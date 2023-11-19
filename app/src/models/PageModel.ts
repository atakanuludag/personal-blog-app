export default interface PageModel {
  readonly _id: string
  readonly title: string
  readonly shortDescription: string
  readonly content: string
  readonly guid: string
  readonly publishingDate: Date
  readonly isShow: boolean
  readonly viewCount: number
  readonly createdAt: Date
  readonly updatedAt: Date
}

export type PageFormModel = {
  readonly _id?: string | null
  readonly title: string
  readonly shortDescription: string
  readonly content: string
  readonly guid: string
  readonly publishingDate: Date
  readonly isShow: boolean
}
