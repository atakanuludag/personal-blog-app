import { IsNotEmpty, IsString, IsDate, IsArray, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { ArticleType } from '../../common/interfaces/enums';

export class CreateArticleDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    shortDescription: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    guid: string;

    @IsDate()
    @Type(() => Date)
    publishingDate: Date;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    categories: ObjectId[];

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    tags: ObjectId[];

    @IsNotEmpty()
    @IsString()
    articleType: ArticleType;
}