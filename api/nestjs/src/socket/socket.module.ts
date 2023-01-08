import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SocketGateway } from './socket.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [SocketGateway],
  imports: [PrismaModule, AuthModule],
})
export class SocketModule {}
