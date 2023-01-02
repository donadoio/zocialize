import {
  ForbiddenException,
  HttpException,
  Injectable,
  Res,
  HttpStatus
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

import { tokenPairDto } from '../../types/tokenPairDto';
import { User } from '@prisma/client';


// Custom Class Validator Types

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private axios: HttpService,
  ) {}

  async logout(id: number) {
    try {
      await this.prisma.user.updateMany({
        where: {
          id: id,
          refreshTokenHash: {
            not: null,
          },
        },
        data: {
          refreshTokenHash: null,
        },
      });
      console.log('Deleted refresh token hash');
      return { statusCode: 200 };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
      {
          throw new HttpException("woops", HttpStatus.BAD_REQUEST);
      }
      //console.log('Error in logout() provider');
      throw error;
    }
  }

  async refreshTokens(
    id: number,
    refreshToken: string,
    emailConfirmed: boolean,
  ) {
    let user: User;
    let tokens: tokenPairDto;
    let hashVerify;
    try {
      user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      // If user is not found or no refreshToken exists, throw error.
      if (!user || !user.refreshTokenHash) {
        throw new ForbiddenException('Refresh token possibly hijacked');
      } else {
        // verify if refresh token matches the one in the user's db entry
        hashVerify = await argon.verify(
          `${user.refreshTokenHash}`,
          refreshToken,
        );
        if (!hashVerify) {
          throw new ForbiddenException('Refresh token possibly hijacked');
        }
      }
      if (user) {
        // If user exists set bool for tokens..
        // Might replace this approach with another.. ->
        // Same process as setnick ->
        if (emailConfirmed === true) {
          tokens = await this.signTokens(user.id, user.email, true);
        } else {
          tokens = await this.signTokens(user.id, user.email, false);
        }
        await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
        return tokens;
      } else {
        throw new ForbiddenException('User not found.');
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
      {
          throw new HttpException("woops", HttpStatus.BAD_REQUEST);
      }
      //console.log('Error on refreshTokens() provider:');
      //console.log(error);
      throw error;
    }
  }

  async updateRefreshTokenHash(id: number, refreshToken: string) {
    let refreshTokenHash: string;
    try {
      refreshTokenHash = await argon.hash(refreshToken);
      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          refreshTokenHash: refreshTokenHash,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
      {
          throw new HttpException("woops", HttpStatus.BAD_REQUEST);
      }
      //console.log('Error on updateRefreshTokenHash()');
      throw error;
    }
  }

  async signTokens(
    userId: number,
    email: string,
    admin: boolean,
  ): Promise<tokenPairDto> {
    // Create a payload object, sub is standard for jwt, we'll use ID, and our own claim (email)
    const payload = {
      sub: userId,
      email: email,
    };

    // Grab secret string from environment
    const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET;
    const refreshTokenSecret: string = process.env.REFRESH_TOKEN_SECRET;

    // Generate token using our payload object through jwt.signAsync
    // Function accepts the payload object and an object with the required secret key, and the expiration time of the token
    try {
      const accessToken = await this.jwt.signAsync(payload, {
        expiresIn: '60m',
        secret: accessTokenSecret,
      });

      const refreshToken = await this.jwt.signAsync(payload, {
        expiresIn: 60 * 60 * 24 * 7 * 4,
        secret: refreshTokenSecret,
      });

      // Return as an object that contains an access_token string.
      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      //console.log('Error in signTokens()');
      throw error;
    }
  }
}
