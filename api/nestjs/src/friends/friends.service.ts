import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaService) {}

  async searchUsers(ownUsername: string, query: string) {
    try {
      const queryLower: string = query.toLowerCase();
      const results = await this.prisma.user.findMany({
        where: {
          usernameLowercase: {
            contains: queryLower,
          },
          NOT: {
            username: ownUsername,
          },
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      return results;
    } catch (e) {
      throw e;
    }
  }

  async getBlockedUsers(id: number) {
    try {
      //await this.prisma.user.update({
      //  where: {
      //    id: id,
      //  },
      //  data: {
      //    friends: {
      //      connect: {
      //        id: 2,
      //      },
      //    },
      //  },
      //});
      const user: User = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        select: { blocked: true, hash: false },
      });
      console.log('result: ', user);
    } catch (e) {
      throw e;
    }
  }
}
