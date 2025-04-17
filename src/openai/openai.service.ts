import { Injectable } from "@nestjs/common";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

import { EnergyService } from "../energy/energy.service";

@Injectable()
export class OpenaiService {
  constructor(private readonly energyService: EnergyService) {}

  public async analyze() {
    const markdown = await this.energyService.table();
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: `
      You are an experienced engineer
      You will be given a data of power consumption of device
      You have to analyze the device and guess what could it be
      Print your best guess after analysis
      
      Example:
        - garden light
        - pool pump
        - washing machine
      `,
      messages: [
        {
          role: "user",
          content: markdown,
        },
      ],
    });

    return { text };
  }
}
