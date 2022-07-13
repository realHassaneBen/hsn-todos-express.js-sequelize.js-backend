import sequelize from "../db/sequelize.js";
import SequelizeSlugify from "sequelize-slugify";

import { ARRAY, INTEGER, STRING, TEXT } from "../db/dataTypes.js";

const Permission = sequelize.define("Permission", {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
    },
    slug: {
        type: STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: STRING,
    },
});

SequelizeSlugify.slugifyModel(Permission, { source: ["name"] });

export default Permission;
