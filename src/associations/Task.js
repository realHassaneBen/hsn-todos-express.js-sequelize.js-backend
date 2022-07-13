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
    through: "Task_Priorities",
});

// belongsToMany
Task.belongsToMany(Label, {
    through: "Task_Labels",
});

export default Task;
