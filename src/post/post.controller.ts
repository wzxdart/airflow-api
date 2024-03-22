import { RolesGuard } from "@auth/guards/roles.guard";
import { Roles } from "@common/decorators";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CreatePostDto, UpdatePostDto } from "@post/dtos";
import { PostService } from "@post/post.service";
import { Role } from "@prisma/client";

@Controller("post")
export class PostController {
  constructor(private readonly _postService: PostService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async createPost(@Body() dto: CreatePostDto) {
    return await this._postService.create(dto);
  }

  @Get()
  async getPosts() {
    return await this._postService.getAll();
  }

  @Get("/id/:id")
  async getPostById(@Param("id") id: string) {
    return await this._postService.getById(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put("/id/:id")
  async updatePost(@Param("id") id: string, @Body() dto: UpdatePostDto) {
    return await this._postService.update(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete("/id/:id")
  async deletePost(@Param("id") id: string) {
    return await this._postService.delete(id);
  }
}
