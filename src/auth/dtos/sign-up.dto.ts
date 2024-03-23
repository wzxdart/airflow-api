import { IsPasswordConfirmConstraint } from "@common/decorators";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";

export class SignUpDto {
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
  @IsEmail()
  @MinLength(4)
  @MaxLength(254)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(254)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(254)
  @Validate(IsPasswordConfirmConstraint)
  passwordConfirm: string;
}
