import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ESettings } from '../interfaces/Enum';

export class SettingsDto {

    @IsNotEmpty()
    @IsEnum(ESettings)
    name: ESettings;

    @IsNotEmpty()
    @IsString()
    value: string;
}