import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

import {
  MYSQL_SEED,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_CACHE,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} from "src/configuration";

import { RoleData, UserData } from "src/database/entities";

export class MySQLDataSource {
  private _datasource: DataSource;

  constructor() {
    const options: DataSourceOptions = {
      type: "mysql",
      host: MYSQL_HOST,
      port: +MYSQL_PORT,
      username: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      cache: MYSQL_CACHE || MYSQL_CACHE === "true" ? true : false,
      synchronize: MYSQL_SEED || MYSQL_SEED === "true" ? true : false,
      dropSchema: false,
      entities: [UserData, RoleData],
      extra: {
        validateConnection: false,
        trustServerCertificate: false,
      },
    };

    this._datasource = new DataSource(options);
  }

  public async connect(): Promise<boolean> {
    try {
      await this._datasource.initialize();
      console.log("[DATASOURCE][MYSQL] CONNECTED");

      return true;
    } catch (error) {
      throw new Error(`[ERROR][DATASOURCE][MYSQL][CONNECT] ${JSON.stringify(error)}`);
    }
  }

  public get client(): DataSource {
    return this._datasource;
  }

  public disconnect(): void {
    this._datasource.destroy();
  }
}
