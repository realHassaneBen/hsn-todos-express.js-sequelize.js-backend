import { Priority, User, Task } from "../models/index.js";

// belongsTo
Priority.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    },
});
Priority.belongsToMany(Task, {
    foreignKey: {
        allowNull: false,
    },
});

export default Priority;
