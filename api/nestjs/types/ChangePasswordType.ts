import {
  IsNotEmpty,
  IsString,
  IsAlphanumeric,
  Length,
  IsEmail,
} from 'class-validator';

export class ChangePasswordType {
  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  oldPassword: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  newPassword: string;
}
