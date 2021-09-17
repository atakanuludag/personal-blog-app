import { IsString, IsDate, IsArray, ArrayMinSize, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { ArticleType } from '../../common/interfaces/enums';

export class UpdateArticleDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    shortDescription: string;

    @IsOptional()
    @IsString()
    content: string;

    @IsOptional()
    @IsString()
    guid: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    publishingDate: Date;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    categories: ObjectId[];

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    tags: ObjectId[];

    @IsOptional()
    @IsEnum(ArticleType)
    articleType: ArticleType;
}