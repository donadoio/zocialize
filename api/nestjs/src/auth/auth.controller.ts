import {
  UseFilters,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Query,
  Post,
  Req,
  Request,
  UseGuards,
  Res,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from 'types/registerDto';
import { ConfigService } from '@nestjs/config';

// Custom Class Validator Types
import { ReqExtractId } from '../../types/ReqExtractId';
import { ReqRefreshTokens } from '../../types/ReqRefreshTokens';
import { AllExceptionsFilter } from './all-exception.filter';
import { LoginType } from 'types/LoginType';
import {
  RegisterAccountType,
  ChangePasswordType,
  ConfirmEmailType,
} from '../../types';

@UseFilters(new AllExceptionsFilter())
@Controller('auth')
export class AuthController {
  private authService: AuthService;
  private configService: ConfigService;
  constructor(authService: AuthService, config: ConfigService) {
    this.authService = authService;
    this.configService = config;
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() data: RegisterAccountType) {
    try {
      const result = await this.authService.register(data);
      return result;
    } catch (e) {
      throw e;
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: LoginType) {
    console.log('POST /auth/login');
    try {
      const result = await this.authService.login(data);
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req: ReqExtractId, @Res({ passthrough: true }) res) {
    try {
      const userId: number = req.user.sub;
      const result = await this.authService.logout(userId);
      res.cookie('pongJwtRefreshToken', undefined, { httpOnly: false });
      return result;
    } catch (error) {
      //console.log('Error coming from logout() controller call');
      throw error;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('confirmemail')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Req() req: ReqExtractId, @Body() data: ConfirmEmailType) {
    console.log('POST /auth/confirmemail');
    try {
      const result = await this.authService.confirmEmail(req.user.sub, data);
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('changepassword')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Req() req: ReqExtractId,
    @Body() data: ChangePasswordType,
  ) {
    console.log('POST /auth/confirmemail');
    try {
      const result = await this.authService.changePassword(req.user.sub, data);
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@Request() req: ReqRefreshTokens) {
    console.log(`POST / auth/refresh, user: [${req.user.sub}]`);
    try {
      const userId: number = req.user.sub;
      const refreshToken: string = req.user.refreshToken;
      const result = await this.authService.refreshTokens(userId, refreshToken);
      return result;
    } catch (error) {
      //console.log('Error coming from refreshTokens() controller call');
      throw error;
    }
  }
}
