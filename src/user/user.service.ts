import { JwtPayload } from "@common/interfaces/jwt";
import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Role, User } from "@prisma/client";
import { PrismaService } from "@prisma/prisma.service";
import { CreateUserDto, UpdateUserDto } from "@user/dtos";
import { hashSync } from "bcryptjs";

@Injectable()
export class UserService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(dto: CreateUserDto) {
    const hashedPassword = this.hash(dto.password);

    return this._prismaService.user.create({
      data: {
        ...dto,
        roles: [Role.USER],
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

  delete(id: string, existUser: JwtPayload) {
    if (existUser.id !== id && existUser.roles.includes(Role.USER))
      throw new ForbiddenException();

    return this._prismaService.user.delete({
      where: { id: id },
    });
  }

  update(email: string, dto: UpdateUserDto) {
    const user = this.getByEmail(email);

    if (!user) throw new ConflictException(`user don't exist with ${email}`);

    return this._prismaService.user.update({
      where: { email: email },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        roles: [...dto.roles],
      },
    });
  }

  private hash(password: string) {
    return hashSync(password, 10);
  }
}
