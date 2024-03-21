import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Cookies = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return key && key in request.cookies
      ? request.cookies[key]
      : request.cookies;
  },
);
