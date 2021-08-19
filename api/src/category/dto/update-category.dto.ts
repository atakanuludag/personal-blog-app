import { IsString, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    guid: string;

    @IsOptional()
    @IsString()
    parentCategory?: ObjectId;
}