import sequelize from "../db/sequelize.js";
import SequelizeSlugify from "sequelize-slugify";

import { ARRAY, INTEGER, STRING, TEXT } from "../db/dataTypes.js";

const Role = sequelize.define("Role", {
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

SequelizeSlugify.slugifyModel(Role, { source: ["name"] });

export default Role;
