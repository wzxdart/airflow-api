import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "@prisma/prisma.service";
import { hashSync } from "bcryptjs";

@Injectable()
export class UserService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(user: Partial<User>) {
    const hashedPassword = this.hash(user.password);

    return this._prismaService.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
      },
    });
  }

  getById(id: string) {
    return this._prismaService.user.findUnique({
      where: { id: id },
    });
  }

  getByEmail(email: string) {
    return this._prismaService.user.findUnique({
      where: { email: email },
    });
  }

  delete(id: string) {
    return this._prismaService.user.delete({
      where: { id: id },
    });
  }

  private hash(password: string) {
    return hashSync(password, 10);
  }
}
