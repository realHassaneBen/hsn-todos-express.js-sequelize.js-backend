import sequelize from "../db/sequelize.js";
import SequelizeSlugify from "sequelize-slugify";

import { STRING, TEXT, DATE } from "../db/dataTypes.js";

const Task = sequelize.define("Task", {
    title: {
        type: STRING,
        allowNull: false,
    },
    slug: {
        type: STRING,
    },
    description: {
        type: TEXT,
        allowNull: false,
    },
    due_date: {
        type: DATE,
        allowNull: false,
    },
});
SequelizeSlugify.slugifyModel(Task, { source: ["title"] });

export default Task;
