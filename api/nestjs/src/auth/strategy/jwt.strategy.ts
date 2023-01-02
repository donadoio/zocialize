import { ForbiddenException, ImATeapotException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, private prisma: PrismaService)
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
            passReqToCallback: true,
        })
    }

    async validate(req: Request, payload: any)
    {
        try
        {
          const user: User = await this.prisma.user.findUnique({
              where: {
                  id: payload.sub,
              },
          });
          if (user)
          {
            return payload;
          }
          else
          {
            throw new ForbiddenException('user does not exist');
          }
        }
        catch(error)
        {
          throw error;
        }
    }
}