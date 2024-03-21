import { CategoryService } from "@category/category.service";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { CreateCategoryDto } from "./dto/create-category.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() dto: CreateCategoryDto) {
    return this._categoryService.create(dto);
  }

  @Get("/id/:id")
  getCategoryById(@Param("id") id: string) {
    return this._categoryService.getCategoryById(id);
  }
}
