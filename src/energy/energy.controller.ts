import { Controller, Get } from "@nestjs/common";

import { EnergyService } from "./energy.service";

@Controller("energy")
export class EnergyController {
  constructor(private readonly energyService: EnergyService) {}

  @Get("/setup")
  public setup() {
    return this.energyService.setup();
  }

  @Get("/table")
  public table() {
    return this.energyService.table();
  }
}
