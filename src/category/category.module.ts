import { CategoryController } from "@category/category.controller";
import { CategoryService } from "@category/category.service";
import { Module } from "@nestjs/common";

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
