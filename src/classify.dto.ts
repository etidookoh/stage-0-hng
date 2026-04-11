import { IsNotEmpty, Matches } from 'class-validator';

export class NameDto {
    @IsNotEmpty()
    @Matches(/^[a-zA-Z]+$/,{
        message: `name must be string`
    })
    name: string;
}

