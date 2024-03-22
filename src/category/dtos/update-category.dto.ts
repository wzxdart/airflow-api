import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(254)
  title: string;
}
