import { Module } from "@nestjs/common";
import { SubjectController } from "@subject/subject.controller";
import { SubjectService } from "@subject/subject.service";

@Module({
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
