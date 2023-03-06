import type { Knex } from "knex";
import * as path from 'path'
const BASE_PATH = path.join(__dirname, "db");
if(!process.env.NODE_ENV) { process.env.NODE_ENV = 'test' }

export const config: { [key: string]: Knex.Config } = {
  test: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_HOST || "0.0.0.0",
      port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "postgres",
      database: process.env.POSTGRES_DATABASE || "process_tree",
    },
    migrations: {
      directory: path.join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds"),
    },
  },
  prod: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
    },
    pool: {
      min: 0,
      max: 40,
      acquireTimeoutMillis: 60000,
      idleTimeoutMillis: 600000,
    },
    migrations: {
      directory: path.join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds"),
    },
  },
};

module.exports = config