// initalize sequelize with session store
import connectSessionSequelize from "connect-session-sequelize";
import session from "express-session";

import sequelize from "./sequelize.js";

// Sequelize Session Store
const SequelizeStore = connectSessionSequelize(session.Store);

const sequelizeStore = new SequelizeStore({
    db: sequelize,
});

export { sequelizeStore };
