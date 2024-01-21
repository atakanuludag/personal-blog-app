import { Document, ObjectId, PopulatedDoc } from 'mongoose'

export interface IFile extends Document {
  readonly isFolder: boolean
  readonly title: string
  readonly description: string
  readonly filename: string
  readonly path: string
  readonly folderId: ObjectId | PopulatedDoc<IFile>
  readonly mimetype: string
  readonly size: number
}
