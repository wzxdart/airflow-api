import { JwtGuard } from "@auth/guards/jwt.guard";
import { RolesGuard } from "@auth/guards/roles.guard";

export const guards = [JwtGuard, RolesGuard];
