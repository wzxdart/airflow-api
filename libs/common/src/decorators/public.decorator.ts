import { ExecutionContext, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export const Public = () => SetMetadata("public", true);

export const isPublic = (context: ExecutionContext, reflector: Reflector) =>
  reflector.getAllAndOverride<boolean>("public", [
    context.getHandler(),
    context.getClass(),
  ]);
