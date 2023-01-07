import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class ChangeProfileColorType {
  @IsNotEmpty()
  @IsString()
  @IsHexColor()
  color: string;
}
