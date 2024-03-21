import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class SignInDto {
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
}
