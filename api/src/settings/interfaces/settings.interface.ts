import { Document } from 'mongoose'
import { ESettings } from '@/settings/interfaces/Enum'
import { ValueType } from '@/common/interfaces/enums'

export interface ISettings extends Document {
  readonly name: ESettings
  readonly title: string
  readonly value: string | number
  readonly type: ValueType
}
