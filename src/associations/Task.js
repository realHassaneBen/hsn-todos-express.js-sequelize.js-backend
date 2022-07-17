import {
    Label,
    Priority,
    Project,
    Task,
    User,
    Comment,
} from "../models/index.js";

// hasMany
Task.hasMany(Comment);

// belongsTo
Task.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    },
});
Task.belongsTo(Project, {});
Task.belongsTo(Priority, {});

// belongsToMany
Task.belongsToMany(Label, {
    through: "Task_Labels",
});

export default Task;
