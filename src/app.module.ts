import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { TemperatureModule } from './temperature/temperature.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TemperatureModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
