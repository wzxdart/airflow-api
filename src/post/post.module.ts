import { Module } from "@nestjs/common";
import { PostController } from "@post/post.controller";
import { PostService } from "@post/post.service";

@Module({
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
