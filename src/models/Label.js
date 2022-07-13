import sequelize from "../db/sequelize.js";
import SequelizeSlugify from "sequelize-slugify";

import { STRING, TEXT, DATE } from "../db/dataTypes.js";

const Label = sequelize.define("Label", {
    name: {
        type: STRING,
        allowNull: false,
    },
    slug: {
        type: STRING,
    },
});
SequelizeSlugify.slugifyModel(Label, { source: ["name"] });

export default Label;
