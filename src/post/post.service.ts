import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

import { CreatePostDto, UpdatePostDto } from "./dtos";

@Injectable()
export class PostService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(dto: CreatePostDto) {
    return this._prismaService.post.create({
      data: {
        ...dto,
      },
    });
  }

  getAll() {
    return this._prismaService.post.findMany();
  }

  getPostById(id: string) {
    return this._prismaService.post.findUnique({
      where: { id: id },
    });
  }

  update(id: string, dto: UpdatePostDto) {
    return this._prismaService.post.update({
      where: { id: id },
      data: {
        ...dto,
      },
    });
  }

  delete(id: string) {
    return this._prismaService.post.delete({
      where: { id: id },
    });
  }
}
