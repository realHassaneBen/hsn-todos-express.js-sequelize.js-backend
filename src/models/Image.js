import sequelize from "../db/sequelize.js";
import SequelizeSlugify from "sequelize-slugify";

import { STRING, TEXT } from "../db/dataTypes.js";
import { Model } from "sequelize";

class Image extends Model {}

Image.init(
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
            type: TEXT,
        },
        secure_url: {
            type: STRING,
        },
        imageableId: { type: STRING },
        imageableType: { type: STRING },
    },
    { sequelize, modelName: "image" }
);

export default Image;
