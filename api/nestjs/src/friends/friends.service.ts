import { Injectable } from '@nestjs/common';
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
}
