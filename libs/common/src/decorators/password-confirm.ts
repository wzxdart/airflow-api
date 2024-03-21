import { SignUpDto } from "@auth/dto";
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "IsPasswordConfirm", async: false })
export class IsPasswordConfirmConstraint
  implements ValidatorConstraintInterface
{
  validate(
    passwordConfirm: string,
    validationArguments?: ValidationArguments,
  ): boolean {
    const object = validationArguments.object as SignUpDto;

    return object.password === passwordConfirm;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return "password not cofmirmed";
  }
}
