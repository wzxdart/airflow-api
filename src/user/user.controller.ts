import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "@user/dto";
import { UserService } from "@user/user.service";

@Controller("user")
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this._userService.create(dto);
  }

  @Get("/id/:id")
  getUserById(@Param("id") id: string) {
    return this._userService.getById(id);
  }

  @Get("/email/:email")
  getUserByEmail(@Param("email") email: string) {
    return this._userService.getByEmail(email);
  }

  @Delete("/id/:id")
  deleteUser(@Param("id") id: string) {
    return this._userService.delete(id);
  }
}
