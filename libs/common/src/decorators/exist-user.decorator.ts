import { JwtPayload } from "@common/interfaces/jwt";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const ExistUser = createParamDecorator(
  (
    key: keyof JwtPayload,
    context: ExecutionContext,
  ): JwtPayload | Partial<JwtPayload> => {
    const request = context.switchToHttp().getRequest();

    return key ? request.user[key] : request.user;
  },
);
