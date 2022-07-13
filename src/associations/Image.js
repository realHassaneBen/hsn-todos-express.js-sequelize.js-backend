import { Image, User } from "../models/index.js";

// belongsTo
Image.belongsTo(User, {
    foreignKey: "imageableId",
    constraints: false,
});

export default Image;
