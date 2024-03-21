import { CategoryModule } from "@category/category.module";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PostModule } from "@post/post.module";
import { PrismaModule } from "@prisma/prisma.module";
import { UserModule } from "@user/user.module";

import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";

@Module({
  imports: [
    UserModule,
    PrismaModule,
    PostModule,
    CategoryModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
