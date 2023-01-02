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
      //console.log(req.url);
        try
        {
          const user: User = await this.prisma.user.findUnique({
              where: {
                  id: payload.sub,
              },
          });
          if (user)
          {
            if (user.emailConfirmed === false)
            {
              throw new HttpException('email not confirmed', 318);
              //throw new ImATeapotException('nickname not set');
            }
            else
            {
              return (payload);
            }
          }
          else
          {
            throw new ForbiddenException('user does not exist');
          }
        }
        catch(error)
        {
          //console.log('Error in validate():');
          //console.log(error);
          throw error;
        }
    }
}