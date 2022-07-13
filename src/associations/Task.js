import { Label, Priority, Project, Task, User } from "../models/index.js";

// belongsTo
Task.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    },
});
Task.belongsTo(Project, {
    foreignKey: {
        allowNull: false,
    },
});

// hasOne
Task.hasOne(Priority, {
    foreignKey: {
        allowNull: false,
    },
});

// hasMany
Task.hasMany(Label, {
    foreignKey: {
        allowNull: false,
    },
});

export default Task;
