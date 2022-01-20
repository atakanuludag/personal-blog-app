import { Document } from 'mongoose'

export interface IUser extends Document {
  readonly userName: string
  readonly email: string
  readonly password: string
  readonly name: string
  readonly surname: string
}
