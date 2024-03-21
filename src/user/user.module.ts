import { Module } from "@nestjs/common";
import { UserController } from "@user/user.controller";
import { UserService } from "@user/user.service";

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
