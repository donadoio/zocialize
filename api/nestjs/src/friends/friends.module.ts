import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [FriendsService],
  controllers: [FriendsController],
  imports: [PrismaModule],
})
export class FriendsModule {}
