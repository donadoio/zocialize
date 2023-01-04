import { IsNotEmpty, IsString, IsAlphanumeric, Length } from 'class-validator';

export class ConfirmEmailType {
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  verificationCode: string;
}
