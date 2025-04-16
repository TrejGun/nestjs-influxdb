import { InfluxDB } from "@influxdata/influxdb-client";
import { BucketsAPI } from "@influxdata/influxdb-client-apis";

import { influxProvider } from "./influx.provider";

export const BUCKET_PROVIDER = Symbol("BUCKET_PROVIDER");

export const bucketProvider = {
  provide: BUCKET_PROVIDER,
  inject: [influxProvider],
  useFactory: (influxProvider: InfluxDB) => {
    return new BucketsAPI(influxProvider);
  },
};
