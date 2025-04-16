import { ConfigService } from "@nestjs/config";
import { InfluxDB } from "@influxdata/influxdb-client";

export const INFLUX_PROVIDER = Symbol("INFLUX_PROVIDER");

export const influxProvider = {
  provide: INFLUX_PROVIDER,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const influxdbUrl = configService.get("INFLUXDB_URL", "");
    const influxdbToken = configService.get("INFLUXDB_TOKEN", "");
    return new InfluxDB({
      url: influxdbUrl,
      token: influxdbToken,
    });
  },
};
