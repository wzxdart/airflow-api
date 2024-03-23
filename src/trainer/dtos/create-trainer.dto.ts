import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateTrainerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(254)
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(254)
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(254)
  middleName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(10000)
  bio: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty()
  @IsString()
  subjectId?: string;
}
