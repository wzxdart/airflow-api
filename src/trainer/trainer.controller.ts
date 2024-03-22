import { RolesGuard } from "@auth/guards/roles.guard";
import { Roles } from "@common/decorators";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Role } from "@prisma/client";
import { CreateTrainerDto } from "@trainer/dtos";
import { UpdateTrainerDto } from "@trainer/dtos/update-trainer.dto";
import { TrainerService } from "@trainer/trainer.service";

@Controller("trainer")
export class TrainerController {
  constructor(private readonly _trainerService: TrainerService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async createTrainer(@Body() dto: CreateTrainerDto) {
    return await this._trainerService.create(dto);
  }

  @Get()
  async getTrainers() {
    return await this._trainerService.getAll();
  }

  @Get("/id/:id")
  async getTrainerById(@Param("id") id: string) {
    return await this._trainerService.getById(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put("/id/:id")
  async updateTrainer(@Param("id") id: string, @Body() dto: UpdateTrainerDto) {
    return await this._trainerService.update(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete("/id/:id")
  async deleteTrainer(@Param("id") id: string) {
    return await this._trainerService.delete(id);
  }
}
