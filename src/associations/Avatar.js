import { Avatar, User } from "../models/index.js";

Avatar.belongsTo(User, {
    foreignKey: "avatarableId",
    constraints: false,
});

export default Avatar;
