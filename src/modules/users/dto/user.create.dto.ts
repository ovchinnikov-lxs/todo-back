import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
    @ApiProperty({ example: 'login', description: 'login' })
    @IsNotEmpty()
    readonly login: string;

    @ApiProperty({ description: 'password' })
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}
