export interface ITableCell {
  readonly id: string | number
  readonly numeric: boolean
  readonly label: string
  formatter?: (value: any) => void
}
