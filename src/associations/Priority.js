import { Priority, User, Task } from "../models/index.js";

// belongsTo
Priority.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    },
});
Priority.hasMany(Task);

export default Priority;
