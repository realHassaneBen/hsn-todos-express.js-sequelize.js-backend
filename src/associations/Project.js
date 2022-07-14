import { Label, Project, Task, User } from "../models/index.js";

// belongsTo
Project.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    },
});

// hasMany
Project.hasMany(Task, {});

export default Project;
