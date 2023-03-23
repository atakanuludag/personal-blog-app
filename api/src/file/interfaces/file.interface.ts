import { Document, ObjectId } from 'mongoose'

export interface IFile extends Document {
  readonly isFolder: boolean
  readonly title: string
  readonly description: string
  readonly filename: string
  readonly path: string
  readonly folderId: ObjectId //todo: populate fonksiyonu kullanıldığı için tüm objectidleri çevireceğiz.
  readonly mimetype: string
  readonly size: number
}
