import { DataSource } from "typeorm";

const datasource = new DataSource({
  type: "postgres",
  host: "postgres",
  username: "postgres",
  password: "supersecret",
  database: "favorite_places",
  port: 5432,
  entities: [__dirname + "/entities/**/*.{js,ts}"],
  logging: true,
  synchronize: true,
});

export default datasource;
