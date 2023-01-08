import { Injectable, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { User } from '@prisma/client';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
@WebSocketGateway(3050, {
  cors: {
    origin: '*',
  },
})
@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private prisma: PrismaService,
    private auth: AuthService,
    private config: ConfigService,
  ) {}

  // Socket connection handlers
  @UseGuards(AuthGuard('jwt-refresh'))
  async handleConnection(client: Socket) {
    console.log('New connection from: ', client.id);
    let user: User;
    try {
      user = await this.auth.verifyWsToken(`${client.handshake.auth.token}`);
    } catch (e) {
      client.disconnect();
    }
  }
  handleDisconnect(client: Socket) {
    console.log('Disconnection: ', client.id);
  }
}
