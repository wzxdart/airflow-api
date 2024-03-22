import { JwtPayload } from "@common/interfaces/jwt";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "@user/user.service";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly _logger = new Logger(JwtStrategy.name);

  constructor(private readonly _userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this._userService.getById(payload.id).catch((error) => {
      this._logger.error(error);

      return null;
    });

    if (!user) throw new UnauthorizedException();

    return payload;
  }
}
