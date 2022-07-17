import sequelize from "../db/sequelize.js";
import SequelizeSlugify from "sequelize-slugify";

import { TEXT } from "../db/dataTypes.js";

const Comment = sequelize.define("Comment", {
    content: {
        type: TEXT,
    },
});

export default Comment;
