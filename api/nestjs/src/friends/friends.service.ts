import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaService) {}

  async getUserFromDb(id: number, action: string) {
    let user: User = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user)
      throw Error(
        'Failed to get user form DB userid: ' +
          id +
          ' when trying to ' +
          action,
      );
    else return user;
  }

  // Top-level actions
  async addFriend(userId: number, targetId: number) {
    const user = await this.getUserFromDb(userId, 'addFriend');
    const target = await this.getUserFromDb(targetId, 'addFriend');
    if (user.username === target.username)
      throw Error(user.username + " can't add himself");
    if (user.blocked.includes(target.id))
      throw Error(target.username + ' is blocked by: ' + user.username);
    if (target.blocked.includes(user.id))
      throw Error(user.username + ' is blocked by: ' + target.username);
    if (target.friendRequests.includes(user.id))
      throw Error(
        user.username +
          ' is already in the request list of: ' +
          target.username,
      );
    if (user.friends.includes(target.id))
      throw Error(
        target.username + ' is already a friend of: ' + user.username,
      );
    if (user.friendRequests.includes(target.id)) {
      await this.deleteFromFriendRequests(user, target);
      await this.addToFriendList(user, target);
      await this.addToFriendList(target, user);
    } else {
      await this.addToFriendRequest(target, user);
    }
    return {
      ...(await this.getFriends(userId)),
      ...(await this.getFriendRequests(userId)),
    };
  }

  async removeFriend(userId: number, targetId: number) {
    const user = await this.getUserFromDb(userId, 'removeFriend');
    const target = await this.getUserFromDb(targetId, 'removeFriend');

    if (!user.friends.includes(target.id))
      throw Error(target.username + ' is not a friend of: ' + user.username);
    await this.deleteFromFriendList(user, target);
    await this.deleteFromFriendList(target, user);

    return await this.getFriends(userId);
  }

  async rejectRequest(userId: number, targetId: number) {
    const user = await this.getUserFromDb(userId, 'rejectRequest');
    const target = await this.getUserFromDb(targetId, 'rejectRequest');

    await this.deleteFromFriendRequests(user, target);

    return await this.getFriendRequests(userId);
  }

  async searchUsers(id: number, ownUsername: string, query: string) {
    try {
      const queryLower: string = query.toLowerCase();
      const list = await this.prisma.user.findMany({
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
      let results = [];
      for (let i: number = 0; i < list.length; i++) {
        results.push({
          ...list[i],
          isFriend: await this.isFriend(id, list[i].id),
        });
      }
      return results;
    } catch (e) {
      throw e;
    }
  }

  // Top level getters
  async getFriendRequests(userId: number) {
    const user = await this.getUserFromDb(userId, 'getFriends');
    let tempUser;

    let friendRequests: [{ id: number; username: string; avatar: string }?] =
      [];

    for (let i = 0; i < user.friendRequests.length; i++) {
      tempUser = await this.prisma.user.findUnique({
        where: {
          id: user.friendRequests[i],
        },
      });
      friendRequests.push({
        id: tempUser.id,
        username: tempUser.username,
        avatar: tempUser.avatar,
      });
    }
    return { friendRequests: friendRequests };
  }

  async getFriends(userId: number) {
    const user = await this.getUserFromDb(userId, 'getFriends');
    let tempUser;
    let friends: [{ id: number; username: string; avatar: string }?] = [];

    for (let i = 0; i < user.friends.length; i++) {
      tempUser = await this.prisma.user.findUnique({
        where: {
          id: user.friends[i],
        },
      });
      friends.push({
        id: tempUser.id,
        username: tempUser.username,
        avatar: tempUser.avatar,
      });
    }
    return { friends: friends };
  }

  // Helper functions
  async deleteFromFriendRequests(user: User, target: User) {
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        friendRequests: {
          set: user.friendRequests.filter((i) => i !== target.id),
        },
      },
    });
  }

  async addToFriendList(user: User, target: User) {
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        friends: {
          set: [...user.friends, target.id],
        },
      },
    });
  }

  async addToFriendRequest(user: User, target: User) {
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        friendRequests: {
          set: [...user.friendRequests, target.id],
        },
      },
    });
  }

  async deleteFromFriendList(user: User, target: User) {
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        friends: {
          set: user.friends.filter((i) => i !== target.id),
        },
      },
    });
  }

  async isFriend(userId: number, targetId: number): Promise<boolean> {
    const user: User = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      for (let i: number = 0; i < user.friends.length; i++) {
        if (targetId === user.friends[i]) return true;
      }
      return false;
    }
    return false;
  }
}
