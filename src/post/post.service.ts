import { Injectable } from "@nestjs/common";
import { Post } from "@prisma/client";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class PostService {
  constructor(private readonly _prismaService: PrismaService) {}
}
