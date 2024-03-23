import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
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
  roles: Role[];
}
