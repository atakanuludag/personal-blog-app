import { Document, ObjectId } from 'mongoose';
import { ArticleType } from '../../common/interfaces/enums';

export interface IArticle extends Document {
    readonly title: string;
    readonly shortDescription: string;
    readonly content: string;
    readonly guid: string;
    readonly publishingDate: Date;
    readonly categories: ObjectId[];
    readonly tags: ObjectId[];
    readonly articleType: ArticleType;
    readonly isShow: boolean;
    readonly viewCount: number;
    readonly likeCount: number;
    readonly createdDate: Date;
    readonly updatedDate: Date;
}