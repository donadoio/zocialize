import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddFriendType {
  @IsNotEmpty()
  @IsNumber()
  targetId: number;
}
