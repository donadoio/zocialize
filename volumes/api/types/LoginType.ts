import { IsNotEmpty, IsString, IsAlphanumeric, Length } from "class-validator";

export class LoginType {
    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    @Length(3, 15)
    username: string;
    @IsNotEmpty()
    @IsString()
    @Length(8, 15)
    password: string;
  }