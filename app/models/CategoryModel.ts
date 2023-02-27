export default interface CategoryModel {
  readonly _id: string
  readonly title: string
  readonly description: string
  readonly guid: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly parent: CategoryModel | null
}

export type CategoryFormModel = {
  readonly title: string
  readonly description: string
  readonly guid: string
  readonly parent: string | null
}
