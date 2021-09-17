import { Document } from 'mongoose';
import { ESettings } from './Enum';

export interface ISettings extends Document {
    readonly name: ESettings;
    readonly value: string;
}