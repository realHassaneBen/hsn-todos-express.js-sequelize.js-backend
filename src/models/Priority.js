import sequelize from "../db/sequelize.js";
import SequelizeSlugify from "sequelize-slugify";

import { STRING, TEXT, DATE } from "../db/dataTypes.js";

const Priority = sequelize.define("Priority", {
    name: {
        type: STRING,
        allowNull: false,
    },
    slug: {
        type: STRING,
    },
    query: {
        type: STRING,
        allowNull: false,
    },
});
SequelizeSlugify.slugifyModel(Priority, { source: ["name"] });

export default Priority;
