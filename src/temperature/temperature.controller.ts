import { Controller, Get } from "@nestjs/common";

import { TemperatureService } from "./temperature.service";

@Controller("temperature")
export class TemperatureController {
  constructor(private readonly temperatureService: TemperatureService) {}

  @Get()
  public createOneRow() {
    return this.temperatureService.createOneRow();
  }
}
