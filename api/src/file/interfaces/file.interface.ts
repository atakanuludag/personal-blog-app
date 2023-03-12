import { Document } from 'mongoose'

export interface IFile extends Document {
  readonly isFolder: boolean
  readonly title: string
  readonly description: string
  readonly filename: string
  readonly path: string
  readonly mimetype: string
  readonly size: number
  readonly folderPath: string
}
