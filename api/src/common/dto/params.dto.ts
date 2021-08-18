import { IsString } from 'class-validator';

export class IdParamsDto {
    @IsString()
    id: string;
}

export class GuidParamsDto {
    @IsString()
    guid: string;
}