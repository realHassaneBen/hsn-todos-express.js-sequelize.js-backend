// NPM Modules
import express from "express";
import passport from "passport";
// Local Import
import sequelize from "./db/sequelize.js";
import "./associations/index.js";

// Route
import routes from "./routes/index.js";
import middlewares from "./middleware/index.js";

// ENV Config
import { expressConfig } from "./config/index.js";

// Seed Database
import { dbSeed, dbSeedFake } from "./seeders/index.js";

const app = express();

app.use(middlewares);

/**
 * -------------- ROUTES ----------------
 */

app.use("/api/v1", routes);

const serverHost = expressConfig.host;
const serverPort = expressConfig.port;

const server = async () => {
    await sequelize.sync({ force: true });
    await dbSeed();
    await dbSeedFake();

    app.listen(serverPort, () => {
        console.log(
            `Sequelize API Server is runnig ..., on port http://${serverHost}:${serverPort}`
        );
    });
};

server();
