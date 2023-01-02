import {
  Body,
  Headers,
  Controller,
  ForbiddenException,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Get,
  HttpCode,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ReqExtractId } from '../../types/ReqExtractId';
import { UserService } from './user.service';
import { SetNickDto } from '../../types/SetNickDto.dto';
import {AllExceptionsFilter} from '../auth/all-exception.filter';

@UseFilters(new AllExceptionsFilter())
@Controller('user')
export class UserController {
  private UserService: UserService;
  constructor(UserService: UserService) {
    this.UserService = UserService;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('changeavatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      dest: './public/srcs/users',
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public/srcs/users');
        },
        filename: function (req, file, cb) {
          cb(null, `user${req.user.sub}.jpg`);
        },
      }),
      limits: { fieldSize: 2 },
      fileFilter: function fileFilter(req, file, cb) {
        if (typeof file === 'undefined') {
          cb(new ForbiddenException('No file selected'), false);
        }
        if (file.mimetype !== 'image/jpeg') {
          cb(new ForbiddenException('file format must be image/jpeg'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async changeavatar(@Req() req: ReqExtractId, @UploadedFile() file) {
    console.log('POST / user/changeavatar');
    try {
      console.log('Trying to log file');
      console.log(file);
      const result = await this.UserService.changeAvatar(req.user.sub, file);
      return result;
    } catch (error) {
      //console.log('Caught error in changeavatar controller');
      throw error;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('removeavatar')
  async removeavatar(@Req() req: ReqExtractId) {
    console.log('POST / user/removeavatar');
    try {
      const result = await this.UserService.removeAvatar(req.user.sub);
      return result;
    } catch (error) {
      //console.log('Caught error in removeavatar controller');
      throw error;
    }
  }

}
