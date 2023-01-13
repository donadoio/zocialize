import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SearchUsersType, AddFriendType, ReqExtractId } from 'types';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('searchusers')
  @HttpCode(HttpStatus.OK)
  async searchUsers(@Req() req: any, @Body() data: SearchUsersType) {
    try {
      const result = await this.friendsService.searchUsers(
        req.user.sub,
        req.user.nickname,
        data.query,
      );
      return { results: result };
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getfriends')
  @HttpCode(HttpStatus.OK)
  async getFriends(@Req() req: ReqExtractId) {
    try {
      console.log('GET / getfriends');
      const friends = this.friendsService.getFriends(req.user.sub);
      return friends;
    } catch (e: Error | unknown) {
      if (e instanceof Error)
        throw new HttpException(`${e.message}`, HttpStatus.BAD_REQUEST);
      else
        throw new HttpException(
          `Unable to fetch friends, unknown error`,
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('addfriend')
  @HttpCode(HttpStatus.OK)
  async addFriend(@Req() req: ReqExtractId, @Body() data: AddFriendType) {
    try {
      console.log('GET / getfriends');
      const friendData = this.friendsService.addFriend(
        req.user.sub,
        data.targetId,
      );
      return friendData;
    } catch (e: Error | unknown) {
      if (e instanceof Error)
        throw new HttpException(`${e.message}`, HttpStatus.BAD_REQUEST);
      else
        throw new HttpException(
          `Unable to fetch friends, unknown error`,
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('removefriend')
  @HttpCode(HttpStatus.OK)
  async removeFriend(@Req() req: ReqExtractId, @Body() data: AddFriendType) {
    try {
      console.log('GET / getfriends');
      const friends = this.friendsService.removeFriend(
        req.user.sub,
        data.targetId,
      );
      return friends;
    } catch (e: Error | unknown) {
      if (e instanceof Error)
        throw new HttpException(`${e.message}`, HttpStatus.BAD_REQUEST);
      else
        throw new HttpException(
          `Unable to fetch friends, unknown error`,
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('rejectrequest')
  @HttpCode(HttpStatus.OK)
  async rejectRequest(@Req() req: ReqExtractId, @Body() data: AddFriendType) {
    try {
      console.log('POST / rejectrequest');
      const result = await this.friendsService.rejectRequest(
        req.user.sub,
        data.targetId,
      );
      return result;
    } catch (e: Error | unknown) {
      if (e instanceof Error)
        throw new HttpException(`${e.message}`, HttpStatus.BAD_REQUEST);
      else
        throw new HttpException(
          `Unable to fetch friends, unknown error`,
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getfriendrequests')
  @HttpCode(HttpStatus.OK)
  async getFriendRequests(@Req() req: ReqExtractId) {
    try {
      console.log('GET / getfriendrequests');
      const friendRequests = this.friendsService.getFriendRequests(
        req.user.sub,
      );
      return friendRequests;
    } catch (e: Error | unknown) {
      if (e instanceof Error)
        throw new HttpException(`${e.message}`, HttpStatus.BAD_REQUEST);
      else
        throw new HttpException(
          `Unable to fetch friend requests, unknown error`,
          HttpStatus.BAD_REQUEST,
        );
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
