export default interface TagModel {
  readonly _id: string
  readonly title: string
  readonly description: string //todo: apiden kaldırılacak.
  readonly guid: string
  readonly createdAt: Date
  readonly updatedAt: Date
}
