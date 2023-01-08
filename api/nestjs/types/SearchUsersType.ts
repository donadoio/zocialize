import { IsNotEmpty, IsString, IsAlphanumeric, Length } from 'class-validator';

export class SearchUsersType {
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  @Length(3, 15)
  query: string;
}
