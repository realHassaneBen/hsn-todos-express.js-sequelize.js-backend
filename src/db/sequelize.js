import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import { sequelizeConfig } from "../config/index.js";
import { runSQLFile } from "../lib/SQLQuery.js";

const citiesSQLPath = path.resolve("src", "sql", "cities.sql");
const countriesSQLPath = path.resolve("src", "sql", "countries.sql");
const statesSQLPath = path.resolve("src", "sql", "states.sql");
const worldSQLPath = path.resolve("src", "sql", "world.sql");

const citiesSQL = fs.readFileSync(citiesSQLPath, "utf8");
const countriesSQL = fs
    .readFileSync(countriesSQLPath, "utf8")

const statesSQL = fs.readFileSync(statesSQLPath, "utf8");
const worldSQL = fs.readFileSync(worldSQLPath, "utf8");

const { database, username, password, options } = sequelizeConfig;

const sequelize = new Sequelize(database, username, password, options);

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

export default sequelize;
