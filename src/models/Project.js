import sequelize from "../db/sequelize.js";
import SequelizeSlugify from "sequelize-slugify";

import { STRING, TEXT, DATE } from "../db/dataTypes.js";

const Project = sequelize.define("Project", {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
    },
    slug: {
        type: STRING,
    },
});
SequelizeSlugify.slugifyModel(Project, { source: ["name"] });

export default Project;
