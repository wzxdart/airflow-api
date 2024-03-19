import { Module } from "@nestjs/common";
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UserModule, PrismaModule, PostModule, CategoryModule],
})
export class AppModule {}
