import { AuthController } from "@auth/auth.controller";
import { AuthService } from "@auth/auth.service";
import { options } from "@auth/config";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "@user/user.module";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UserModule, PassportModule, JwtModule.registerAsync(options())],
})
export class AuthModule {}
