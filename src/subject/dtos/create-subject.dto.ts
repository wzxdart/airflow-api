import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(254)
  title: string;
}
