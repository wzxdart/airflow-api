import { CategoryModule } from "@category/category.module";
import { Module } from "@nestjs/common";
import { PostModule } from "@post/post.module";
import { PrismaModule } from "@prisma/prisma.module";
import { UserModule } from "@user/user.module";

@Module({
  imports: [UserModule, PrismaModule, PostModule, CategoryModule],
})
export class AppModule {}
