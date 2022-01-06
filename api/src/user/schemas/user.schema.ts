import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, unique: true })
  userName: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true, select: false })
  password: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  surname: string
}

export const UserSchema = SchemaFactory.createForClass(User)
