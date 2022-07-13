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
Task.belongsTo(Priority, {});

// belongsToMany
Task.belongsToMany(Label, {
    through: "Task_Labels",
});

export default Task;
