import { AthleteController } from "@athlete/athlete.controller";
import { AthleteService } from "@athlete/athlete.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [AthleteController],
  providers: [AthleteService],
})
export class AthleteModule {}
