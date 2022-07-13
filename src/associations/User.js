import { Avatar, Image, Project, Role, User } from "../models/index.js";
import Task from "../models/Task.js";

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
User.hasMany(Task, {
    foreignKey: {
        allowNull: false,
    },
});
User.hasMany(Project, {
    foreignKey: {
        allowNull: false,
    },
});

// belongsToMany
User.belongsToMany(Role, {
    through: "user_roles",
});

export default User;
