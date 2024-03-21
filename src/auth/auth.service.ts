import { SignInDto, SignUpDto } from "@auth/dto";
import { Tokens } from "@common/interfaces/tokens";
import {
  ConflictException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Token, User } from "@prisma/client";
import { PrismaService } from "@prisma/prisma.service";
import { UserService } from "@user/user.service";
import { compareSync } from "bcryptjs";
import { add } from "date-fns";
import { Response } from "express";
import { v4 as uuid } from "uuid";

@Injectable()
export class AuthService {
  private readonly _logger = new Logger(AuthService.name);

  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async signIn(dto: SignInDto, userAgent: string): Promise<Tokens> {
    const user: User = await this._userService
      .getByEmail(dto.email)
      .catch((error) => {
        this._logger.error(error);

        return null;
      });

    if (!user && !compareSync(dto.password, user.password))
      throw new UnauthorizedException("invalid login or password");

    return this.createTokens(user, userAgent);
  }

  async signUp(dto: SignUpDto) {
    const user: User = await this._userService
      .getByEmail(dto.email)
      .catch((error) => {
        this._logger.error(error);

        return null;
      });

    if (user) throw new ConflictException(`user is exist with ${dto.email}`);

    return this._userService.create(dto).catch((error) => {
      this._logger.error(error);

      return null;
    });
  }

  async setRefreshToken(tokens: Tokens, response: Response) {
    if (!tokens) throw new UnauthorizedException();

    const refreshToken = tokens.refreshToken;

    response.cookie("refresh_token", refreshToken.token, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(refreshToken.expiredAt),
      secure: process.env.NODE_ENV === "prod",
      path: "/",
    });

    response.status(HttpStatus.CREATED).json(tokens.accessToken);
  }

  async refreshTokens(
    refreshToken: string,
    userAgent: string,
  ): Promise<Tokens> {
    const token = await this._prismaService.token.findUnique({
      where: {
        token: refreshToken,
      },
    });

    if (!token) throw new UnauthorizedException();

    await this._prismaService.token.delete({
      where: {
        token: refreshToken,
      },
    });

    if (new Date(token.expiredAt) < new Date())
      throw new UnauthorizedException();

    const user = await this._userService.getById(token.userId);

    return this.createTokens(user, userAgent);
  }

  private async createTokens(user: User, userAgent: string): Promise<Tokens> {
    const accessToken = this._jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = await this.getRefreshToken(user.id, userAgent);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async getRefreshToken(
    userId: string,
    userAgent: string,
  ): Promise<Token> {
    const token = await this._prismaService.token.findFirst({
      where: {
        userId: userId,
        userAgent: userAgent,
      },
    });

    return this._prismaService.token.upsert({
      where: {
        token: token?.token ?? "",
      },
      update: {
        token: uuid(),
        expiredAt: add(new Date(), {
          months: 1,
        }),
      },
      create: {
        userId: userId,
        userAgent: userAgent,
        token: uuid(),
        expiredAt: add(new Date(), {
          months: 1,
        }),
      },
    });
  }
}
