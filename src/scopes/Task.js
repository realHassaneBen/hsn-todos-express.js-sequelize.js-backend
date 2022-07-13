import UserSensitiveData from "../constants/SensitiveData.js";
import { Task, User } from "../models/index.js";

Task.addScope("withAssociations", {
    include: [
        {
            model: User,
            attributes: {
                exclude: [...UserSensitiveData],
            },
        },
    ],
});

export default Task;
