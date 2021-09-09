import { Document } from 'mongoose';

export interface IFile extends Document {
    readonly title: string;
    readonly description: string;
    readonly filename: string;
    readonly path: string;
    readonly mimetype: string;
    readonly size: number;
}