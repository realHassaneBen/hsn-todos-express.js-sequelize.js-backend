import { Label, User, Task } from "../models/index.js";

// belongsTo
Label.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    },
});
Label.belongsToMany(Task, {
    foreignKey: {
        allowNull: false,
    },
});

export default Label;
