import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { influxProvider } from "../influxdb/influx.provider";
import { TemperatureService } from "./temperature.service";
import { TemperatureController } from "./temperature.controller";

@Module({
  imports: [ConfigModule],
  controllers: [TemperatureController],
  providers: [influxProvider, TemperatureService],
  exports: [TemperatureService],
})
export class TemperatureModule {}
