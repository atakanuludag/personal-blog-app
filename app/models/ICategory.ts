export default interface ICategory {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly guid: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly parent: ICategory | null
}
