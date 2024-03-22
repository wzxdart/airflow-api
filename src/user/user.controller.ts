import { RolesGuard } from "@auth/guards/roles.guard";
import { ExistUser, Roles } from "@common/decorators";
import { JwtPayload } from "@common/interfaces/jwt";
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { Role } from "@prisma/client";
import { UserService } from "@user/user.service";

import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserResponse } from "./responses";

@Controller("user")
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/id/:id")
  async getUserById(@Param("id") id: string) {
    const user = await this._userService.getById(id);

    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/email/:email")
  async getUserByEmail(@Param("email") email: string) {
    const user = await this._userService.getByEmail(email);

    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete("/id/:id")
  async deleteUser(
    @Param("id") id: string,
    @ExistUser() existUser: JwtPayload,
  ) {
    const user = await this._userService.delete(id, existUser);

    return new UserResponse(user);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put("/email/:email")
  async updateUser(@Param("email") email: string, @Body() dto: UpdateUserDto) {
    const user = await this._userService.update(email, dto);

    return new UserResponse(user);
  }
}
