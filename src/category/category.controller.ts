import { RolesGuard } from "@auth/guards/roles.guard";
import { CategoryService } from "@category/category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "@category/dtos";
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
import { Role } from "@prisma/client";

@Controller("category")
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async createCategory(@Body() dto: CreateCategoryDto) {
    return await this._categoryService.create(dto);
  }

  @Get()
  async getCetegories() {
    return await this._categoryService.getAll();
  }

  @Get("/id/:id")
  async getCategoryById(@Param("id") id: string) {
    return await this._categoryService.getCategoryById(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put("/id/:id")
  async updateCategory(
    @Param("id") id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return await this._categoryService.update(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete("/id/:id")
  async deleteCategory(@Param("id") id: string) {
    return await this._categoryService.delete(id);
  }
}
