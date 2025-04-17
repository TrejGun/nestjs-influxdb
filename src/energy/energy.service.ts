import { ConfigService } from "@nestjs/config";
import { Inject, Injectable } from "@nestjs/common";
import { InfluxDB, Point } from "@influxdata/influxdb-client";
import { v7 } from "uuid";

import { INFLUX_PROVIDER } from "../influxdb/influx.provider";

const ENERGY_BUCKET = "energy-bucket";

@Injectable()
export class EnergyService {
  constructor(
    @Inject(INFLUX_PROVIDER)
    private readonly influxDb: InfluxDB,
    private readonly configService: ConfigService,
  ) {}

  public async setup() {
    const organization = this.configService.get<string>("INFLUXDB_ORG", "ethberry");
    const writeApi = this.influxDb.getWriteApi(organization, ENERGY_BUCKET);

    const deviceId = v7();
    const now = new Date();
    const past = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    for (let i = 0; i < 7 * 24 * 60; i++) {
      const point = new Point("energy")
        .tag("deviceId", deviceId)
        .floatField("kWh", parseFloat((Math.random() * 100).toFixed(2)))
        .timestamp(new Date(past.getTime() + i * 60 * 1000));

      writeApi.writePoint(point);
    }

    await writeApi.close();
    return { ok: true };
  }

  public async table() {
    const now = new Date();
    const fromDate = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000);
    const toDate = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

    const data = await this.queryByDateRange(fromDate, toDate);

    const header = `| Time | kWh |\n|------|-----|`;
    const rows = data.map(d => `| ${new Date(d.time).toISOString()} | ${d.kWh.toFixed(2)} |`);

    return [header, ...rows].join("\n");
  }

  async queryByDateRange(fromDate: Date, toDate: Date) {
    const fluxQuery = `
    from(bucket: "${ENERGY_BUCKET}")
      |> range(start: ${fromDate.toISOString()}, stop: ${toDate.toISOString()})
      |> filter(fn: (r) => r._measurement == "energy")
      |> filter(fn: (r) => r._field == "kWh")
      |> keep(columns: ["_time", "deviceId", "_value"])
      |> sort(columns: ["_time"])
  `;

    const results: { time: string; deviceId: string; kWh: number }[] = [];

    const organization = this.configService.get<string>("INFLUXDB_ORG", "ethberry");
    const queryApi = this.influxDb.getQueryApi(organization);

    return new Promise<typeof results>((resolve, reject) => {
      queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          results.push({
            time: o._time,
            deviceId: o.deviceId,
            kWh: o._value,
          });
        },
        error(err: Error) {
          reject(err);
        },
        complete() {
          resolve(results);
        },
      });
    });
  }
}
