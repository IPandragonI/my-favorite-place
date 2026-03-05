import { DataSource } from "typeorm";

const datasource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "postgres",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "supersecret",
  database: process.env.DB_NAME || "favorite_places",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  entities: [__dirname + "/entities/**/*.{js,ts}"],
  logging: true,
  synchronize: true,
});

export default datasource;
