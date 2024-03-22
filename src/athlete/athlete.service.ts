import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

import { CreateAthleteDto, UpdateAthleteDto } from "./dtos";

@Injectable()
export class AthleteService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(dto: CreateAthleteDto) {
    return this._prismaService.athlete.create({
      data: {
        ...dto,
      },
    });
  }

  getAll() {
    return this._prismaService.athlete.findMany();
  }

  getAthleteById(id: string) {
    return this._prismaService.athlete.findUnique({
      where: { id: id },
    });
  }

  update(id: string, dto: UpdateAthleteDto) {
    return this._prismaService.athlete.update({
      where: { id: id },
      data: {
        ...dto,
      },
    });
  }

  delete(id: string) {
    return this._prismaService.athlete.delete({
      where: { id: id },
    });
  }
}
