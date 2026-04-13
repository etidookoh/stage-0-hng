import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class NameDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z]+$/,{
        message: `name must be string`
    })
    name: string;
}

