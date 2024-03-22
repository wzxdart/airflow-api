import { CreateCategoryDto, UpdateCategoryDto } from "@category/dtos";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class CategoryService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(dto: CreateCategoryDto) {
    return this._prismaService.category.create({
      data: {
        ...dto,
      },
    });
  }

  getAll() {
    return this._prismaService.category.findMany();
  }

  getById(id: string) {
    return this._prismaService.category.findUnique({
      where: { id: id },
    });
  }

  update(id: string, dto: UpdateCategoryDto) {
    return this._prismaService.category.update({
      where: { id: id },
      data: {
        ...dto,
      },
    });
  }

  delete(id: string) {
    return this._prismaService.category.delete({
      where: { id: id },
    });
  }
}
