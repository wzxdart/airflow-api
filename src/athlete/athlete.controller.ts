import { AthleteService } from "@athlete/athlete.service";
import { CreateAthleteDto, UpdateAthleteDto } from "@athlete/dtos";
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

@Controller("athlete")
export class AthleteController {
  constructor(private readonly _athleteService: AthleteService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async createAthlete(@Body() dto: CreateAthleteDto) {
    return await this._athleteService.create(dto);
  }

  @Get()
  async getAthletes() {
    return await this._athleteService.getAll();
  }

  @Get("/id/:id")
  async getAthleteById(@Param("id") id: string) {
    return await this._athleteService.getById(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put("/id/:id")
  async updateAthlete(@Param("id") id: string, @Body() dto: UpdateAthleteDto) {
    return await this._athleteService.update(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete("/id/:id")
  async deleteAthlete(@Param("id") id: string) {
    return await this._athleteService.delete(id);
  }
}
