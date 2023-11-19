import ListQueryModel from '@/models/ListQueryModel'

export default interface FileModel {
  readonly _id: string
  readonly title: string
  readonly description: string
  readonly filename: string
  readonly path: string
  readonly folderId: string | null
  readonly mimetype: string
  readonly size: number
  readonly isFolder: boolean
  readonly createdAt: Date
  readonly updatedAt: Date
}

export type FileListQueryModel = {
  folderId?: string | null
} & ListQueryModel

export interface FileForm {
  readonly _id: string
  readonly title: string
  readonly description: string
}
