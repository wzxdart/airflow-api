import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateSubjectDto, UpdateSubjectDto } from "@subject/dtos";

@Injectable()
export class SubjectService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(dto: CreateSubjectDto) {
    return this._prismaService.subject.create({
      data: {
        ...dto,
      },
    });
  }

  getAll() {
    return this._prismaService.subject.findMany();
  }

  getSubjectById(id: string) {
    return this._prismaService.subject.findUnique({
      where: { id: id },
    });
  }

  update(id: string, dto: UpdateSubjectDto) {
    return this._prismaService.subject.update({
      where: { id: id },
      data: {
        ...dto,
      },
    });
  }

  delete(id: string) {
    return this._prismaService.subject.delete({
      where: { id: id },
    });
  }
}
