import sequelize from "../db/sequelize.js";
import SequelizeSlugify from "sequelize-slugify";

import { STRING } from "../db/dataTypes.js";
import { Model } from "sequelize";

class Avatar extends Model {}

Avatar.init(
    {
        public_id: {
            type: STRING,
        },
        version: {
            type: STRING,
        },
        signature: {
            type: STRING,
        },
        width: {
            type: STRING,
        },
        height: {
            type: STRING,
        },
        format: {
            type: STRING,
        },
        resource_type: {
            type: STRING,
        },
        created_at: {
            type: STRING,
        },
        bytes: {
            type: STRING,
        },
        type: {
            type: STRING,
        },
        url: {
            type: STRING,
        },
        secure_url: {
            type: STRING,
        },
        avatarableId: { type: STRING },
        avatarableType: { type: STRING },
    },
    { sequelize, modelName: "avatar" }
);

export default Avatar;
