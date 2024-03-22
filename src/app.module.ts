import { JwtGuard } from "@auth/guards/jwt.guard";
import { CategoryModule } from "@category/category.module";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { PostModule } from "@post/post.module";
import { PrismaModule } from "@prisma/prisma.module";
import { UserModule } from "@user/user.module";

import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { AthleteModule } from './athlete/athlete.module';
import { TrainerModule } from './trainer/trainer.module';
import { SubjectModule } from './subject/subject.module';

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
    AthleteModule,
    TrainerModule,
    SubjectModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
