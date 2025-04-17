import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { influxProvider } from "../influxdb/influx.provider";
import { EnergyService } from "./energy.service";
import { EnergyController } from "./energy.controller";

@Module({
  imports: [ConfigModule],
  controllers: [EnergyController],
  providers: [influxProvider, EnergyService],
  exports: [EnergyService],
})
export class EnergyModule {}
