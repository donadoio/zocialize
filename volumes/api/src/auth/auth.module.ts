import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy, JwtStrategy } from './strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategy, JwtRefreshStrategy],
  imports: [PrismaModule, JwtModule.register({}), HttpModule,],
  exports: [AuthService]
})
export class AuthModule {}
