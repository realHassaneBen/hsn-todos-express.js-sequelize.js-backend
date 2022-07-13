import { Label, Project, Task, User } from "../models/index.js";

// belongsTo
Project.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    },
});

// hasMany
Project.hasMany(Task, {
    foreignKey: {
        allowNull: false,
    },
});

export default Project;
