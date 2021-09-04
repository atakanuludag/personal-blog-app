import { IsString, IsOptional, IsEnum } from 'class-validator';
import { OrderBy } from '../interfaces/query.interface';

export class ListQueryDto {

    @IsOptional()
    @IsString()
    s: string;

    @IsOptional()
    @IsString()
    sType: string;

    @IsOptional()
    @IsString()
    order: string;

    @IsOptional()
    @IsEnum(OrderBy)
    orderBy: OrderBy;

    @IsOptional()
    @IsString()
    pageSize: number;

    @IsOptional()
    @IsString()
    page: number;


}
