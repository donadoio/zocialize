import {
  ForbiddenException,
  HttpException,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private auth: AuthService,
    private config: ConfigService,
  ) {}

  async changeAvatar(id: number, file: any) {
    try {
      let user: User = await this.prisma.user.findUnique({ where: { id: id } });
      if (user) {
        user = await this.prisma.user.update({
          where: {
            id: id,
          },
          data: {
            avatar: `${process.env.BACKEND_URL}/srcs/users/${file.filename}`,
          },
        });
        return {
          avatar: user.avatar === 'default' ? 'default' : user.avatar,
        };
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('woops', HttpStatus.BAD_REQUEST);
      }
      //console.log('Error trying to change avatar:');
      //console.log(error);
      throw error;
    }
  }

  async removeAvatar(id: number) {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!user) {
        throw new ForbiddenException('user not found');
      } else {
        await this.prisma.user.update({
          where: { id: id },
          data: { avatar: 'default' },
        });
        console.log(`Successfully removed avatar for ${user.username}`);
        return { avatar: user.avatar };
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('woops', HttpStatus.BAD_REQUEST);
      }
      //console.log('Error trying to remove avatar:');
      //console.log(error);
      throw error;
    }
  }

  async getProfile(id: number) {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      if (user) {
        return {
          nickname: user.username,
          id: user.id,
        };
      } else {
        throw new HttpException('woops', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('woops', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  async getBasicProfile(id: number) {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      if (user) {
        return {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
          profileColor: user.profileColor,
        };
      } else {
        throw new HttpException('woops', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('woops', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  async changeProfileColor(id: number, color: string) {
    try {
      await this.prisma.user.update({
        where: { id: id },
        data: { profileColor: color },
      });
      return { color: color };
    } catch (error) {
      throw error;
    }
  }

  async notifyMe(id: number) {
    try {
      //await this.socket.notifyMe(id);
    } catch (error) {
      throw error;
    }
  }
}
