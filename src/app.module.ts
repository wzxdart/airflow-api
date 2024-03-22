import { AthleteModule } from "@athlete/athlete.module";
import { AuthModule } from "@auth/auth.module";
import { AuthService } from "@auth/auth.service";
import { JwtGuard } from "@auth/guards/jwt.guard";
import { CategoryModule } from "@category/category.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { PostModule } from "@post/post.module";
import { PrismaModule } from "@prisma/prisma.module";
import { SubjectModule } from "@subject/subject.module";
import { TrainerModule } from "@trainer/trainer.module";
import { UserModule } from "@user/user.module";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    PostModule,
    CategoryModule,
    AthleteModule,
    TrainerModule,
    SubjectModule,
    //
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //
    JwtModule,
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
