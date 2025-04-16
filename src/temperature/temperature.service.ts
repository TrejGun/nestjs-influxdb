import { ConfigService } from "@nestjs/config";
import { Inject, Injectable } from "@nestjs/common";
import { InfluxDB, Point } from "@influxdata/influxdb-client";

import { INFLUX_PROVIDER } from "../influxdb/influx.provider";

const TEMPERATURE_BUCKET = "temperature-bucket";

@Injectable()
export class TemperatureService {
  constructor(
    @Inject(INFLUX_PROVIDER)
    private readonly influxDb: InfluxDB,
    private readonly configService: ConfigService,
  ) {}

  public async createOneRow() {
    const organization = this.configService.get<string>("INFLUXDB_ORG", "ethberry");
    const writeApi = this.influxDb.getWriteApi(organization, TEMPERATURE_BUCKET);
    const point = new Point("temperature").tag("sensor_id", "TLM010").floatField("value", 24);
    writeApi.writePoint(point);
    await writeApi.close();
  }
}
