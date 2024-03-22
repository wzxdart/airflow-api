import { AuthController } from "@auth/auth.controller";
import { AuthService } from "@auth/auth.service";
import { options } from "@auth/config";
import { guards } from "@auth/guards";
import { strategies } from "@auth/strategies";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "@user/user.module";

@Module({
  providers: [AuthService, ...strategies, ...guards],
  controllers: [AuthController],
  imports: [PassportModule, JwtModule.registerAsync(options()), UserModule],
})
export class AuthModule {}
