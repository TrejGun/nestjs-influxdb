import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { EnergyModule } from "../energy/energy.module";
import { OpenaiService } from "./openai.service";
import { OpenaiController } from "./openai.controller";

@Module({
  imports: [ConfigModule, EnergyModule],
  controllers: [OpenaiController],
  providers: [OpenaiService],
  exports: [OpenaiService],
})
export class OpenaiModule {}
