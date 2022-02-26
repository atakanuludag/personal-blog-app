import { Document } from 'mongoose'

export interface IPage extends Document {
  readonly title: string
  readonly shortDescription: string
  readonly content: string
  readonly guid: string
  readonly publishingDate: Date
  readonly isShow: boolean
  readonly viewCount: number
  readonly viewIPs?: string[]
}
