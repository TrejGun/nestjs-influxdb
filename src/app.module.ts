import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { EnergyModule } from "./energy/energy.module";
import { OpenaiModule } from "./openai/openai.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    EnergyModule,
    OpenaiModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
