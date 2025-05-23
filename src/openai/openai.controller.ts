import { Controller, Get } from "@nestjs/common";

import { OpenaiService } from "./openai.service";

@Controller("openai")
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Get("/analyze")
  public analyze() {
    return this.openaiService.analyze();
  }
}
