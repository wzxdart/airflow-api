import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class CategoryService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(category: Partial<Category>) {
    return this._prismaService.category.create({
      data: {
        title: category.title,
      },
    });
  }

  getCategoryById(id: string) {
    return this._prismaService.category.findUnique({
      where: { id: id },
    });
  }
}
