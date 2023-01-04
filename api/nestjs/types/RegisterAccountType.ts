import {
  IsNotEmpty,
  IsString,
  IsAlphanumeric,
  Length,
  IsEmail,
} from 'class-validator';

export class RegisterAccountType {
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  @Length(3, 15)
  username: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  password: string;
}
