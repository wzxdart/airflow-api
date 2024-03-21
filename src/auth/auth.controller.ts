import { AuthService } from "@auth/auth.service";
import { SignInDto, SignUpDto } from "@auth/dto";
import { Cookies } from "@common/decorators";
import { UserAgent } from "@common/decorators/user-agent";
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

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

    this._authService.setRefreshToken(tokens, response);
  }

  @Post("sign-up")
  async signUp(@Body() dto: SignUpDto) {
    const user = await this._authService.signUp(dto);

    if (!user)
      throw new BadRequestException(
        `sign up error with data: ${JSON.stringify(dto)}`,
      );
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

    this._authService.setRefreshToken(tokens, response);
  }
}
