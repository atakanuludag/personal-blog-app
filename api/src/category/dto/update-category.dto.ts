import { IsString, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

//Todo: https://www.npmjs.com/package/@nestjs/mapped-types

export class UpdateCategoryDto  {
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
    parent?: ObjectId;
}