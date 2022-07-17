import {
    Avatar,
    Image,
    Label,
    Priority,
    Project,
    Role,
    User,
    Comment,
    Task,
} from "../models/index.js";

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
User.hasMany(Comment, {
    foreignKey: {
        allowNull: false,
    },
});
User.hasMany(Label, {
    foreignKey: {
        allowNull: false,
    },
});
User.hasMany(Priority, {
    foreignKey: {
        allowNull: false,
    },
});

// belongsToMany
User.belongsToMany(Role, {
    through: "user_roles",
});

export default User;
