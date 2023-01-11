import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReqExtractId } from 'types/ReqExtractId';
import { ReqExtractUsername } from 'types/ReqExtractUsername';
import { SearchUsersType } from 'types/SearchUsersType';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('searchusers')
  @HttpCode(HttpStatus.OK)
  async searchUsers(
    @Req() req: ReqExtractUsername,
    @Body() data: SearchUsersType,
  ) {
    try {
      const result = await this.friendsService.searchUsers(
        req.user.nickname,
        data.query,
      );
      return { results: result };
    } catch (e) {
      throw e;
    }
  }

  //@Post('getblockedusers')
  //@HttpCode(HttpStatus.OK)
  //async getBlockedUsers(@Req() req: ReqExtractId) {
  //  try {
  //    const result = await this.friendsService.getBlockedUsers(1);
  //  } catch (e) {
  //    throw e;
  //  }
  //}
}
