import { Module } from "@nestjs/common";
import { TrainerController } from "@trainer/trainer.controller";
import { TrainerService } from "@trainer/trainer.service";

@Module({
  controllers: [TrainerController],
  providers: [TrainerService],
})
export class TrainerModule {}
