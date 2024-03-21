import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
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
}
