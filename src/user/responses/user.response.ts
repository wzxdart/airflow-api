import { Role, User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserResponse implements User {
  constructor(user: User) {
    Object.assign(this, user);
  }

  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  roles: Role[];

  @Exclude()
  password: string;
}
