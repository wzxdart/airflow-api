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
import { CreateSubjectDto, UpdateSubjectDto } from "@subject/dtos";
import { SubjectService } from "@subject/subject.service";

@Controller("subject")
export class SubjectController {
  constructor(private readonly _subjectService: SubjectService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async createSubject(@Body() dto: CreateSubjectDto) {
    return await this._subjectService.create(dto);
  }

  @Get()
  async getSubjects() {
    return await this._subjectService.getAll();
  }

  @Get("/id/:id")
  async getSubjectById(@Param("id") id: string) {
    return await this._subjectService.getSubjectById(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put("/id/:id")
  async updateSubject(@Param("id") id: string, @Body() dto: UpdateSubjectDto) {
    return await this._subjectService.update(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete("/id/:id")
  async deleteSubject(@Param("id") id: string) {
    return await this._subjectService.delete(id);
  }
}
