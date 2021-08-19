import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateTagDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    guid: string;
}