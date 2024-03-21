import { IsPasswordConfirmConstraint } from "@common/decorators";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(254)
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(254)
  readonly lastName: string;

  @IsString()
  @IsEmail()
  @MinLength(4)
  @MaxLength(254)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(254)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(254)
  @Validate(IsPasswordConfirmConstraint)
  readonly passwordConfirm: string;
}
