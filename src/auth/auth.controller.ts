import { AuthService } from "@auth/auth.service";
import { SignInDto, SignUpDto } from "@auth/dtos";
import { Cookies, Public } from "@common/decorators";
import { UserAgent } from "@common/decorators/user-agent.decorator";
import { Tokens } from "@common/interfaces/tokens";
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseInterceptors,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserResponse } from "@user/responses";
import { Response } from "express";

@Public()
@Controller("auth")
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _configService: ConfigService,
  ) {}

  @Post("sign-in")
  async signIn(
    @Body() dto: SignInDto,
    @Res() response: Response,
    @UserAgent() userAgent: string,
  ) {
    const tokens = await this._authService.signIn(dto, userAgent);

    if (!tokens)
      throw new BadRequestException(
        `sign in error with data: ${JSON.stringify(dto)}`,
      );

    this.setRefreshToken(tokens, response);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post("sign-up")
  async signUp(@Body() dto: SignUpDto) {
    const user = await this._authService.signUp(dto);

    if (!user)
      throw new BadRequestException(
        `sign up error with data: ${JSON.stringify(dto)}`,
      );

    return new UserResponse(user);
  }

  @Get("refresh")
  async getRefreshTokens(
    @Cookies("refresh_token") refreshToken: string,
    @Res() response: Response,
    @UserAgent() UserAgent: string,
  ) {
    if (!refreshToken) throw new UnauthorizedException();

    const tokens = await this._authService.refreshTokens(
      refreshToken,
      UserAgent,
    );

    if (!tokens) throw new UnauthorizedException();

    this.setRefreshToken(tokens, response);
  }

  @Get("sign-out")
  async signOut(
    @Cookies("refresh_token") refreshToken: string,
    @Res() response: Response,
  ) {
    if (!refreshToken) {
      response.sendStatus(HttpStatus.OK);

      return;
    }

    await this._authService.deleteRefreshToken(refreshToken);

    response.cookie("refresh_token", "", {
      httpOnly: true,
      expires: new Date(),
      secure: true,
    });

    response.sendStatus(HttpStatus.OK);
  }

  private async setRefreshToken(tokens: Tokens, response: Response) {
    if (!tokens) throw new UnauthorizedException();

    const refreshToken = tokens.refreshToken;

    response.cookie("refresh_token", refreshToken.token, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(refreshToken.expiredAt),
      secure: this._configService.get("NODE_ENV") === "production",
      path: "/",
    });

    response.status(HttpStatus.CREATED).json(tokens.accessToken);
  }
}
