import { Label, User, Task } from "../models/index.js";

// belongsTo
Label.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    },
});

// belongsToMany
Label.belongsToMany(Task, {
    through: "Task_Labels",
});

export default Label;
