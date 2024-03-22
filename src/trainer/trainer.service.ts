import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateTrainerDto } from "@trainer/dtos";
import { UpdateTrainerDto } from "@trainer/dtos/update-trainer.dto";

@Injectable()
export class TrainerService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(dto: CreateTrainerDto) {
    return this._prismaService.trainer.create({
      data: {
        ...dto,
      },
    });
  }

  getAll() {
    return this._prismaService.trainer.findMany();
  }

  getById(id: string) {
    return this._prismaService.trainer.findUnique({
      where: { id: id },
    });
  }

  update(id: string, dto: UpdateTrainerDto) {
    return this._prismaService.trainer.update({
      where: { id: id },
      data: {
        ...dto,
      },
    });
  }

  delete(id: string) {
    return this._prismaService.trainer.delete({
      where: { id: id },
    });
  }
}
