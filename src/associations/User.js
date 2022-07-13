import { Avatar, Image, Role, User } from "../models/index.js";

// hasMany
User.hasMany(Image, {
    foreignKey: "imageableId",
    constraints: false,
    scope: {
        imageableType: "user",
    },
});
User.hasMany(Avatar, {
    foreignKey: "avatarableId",
    constraints: false,
    scope: {
        avatarableType: "user",
    },
});

// belongsToMany
User.belongsToMany(Role, {
    through: "user_roles",
});

export default User;
