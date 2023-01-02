import { IsNotEmpty, IsString, IsAlphanumeric, Length, IsEmail } from 'class-validator';

export class RegisterDto
{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    @Length(3, 15)
    nickname: string;
    @IsNotEmpty()
    @IsString()
    @Length(8, 15)
    password: string;
}