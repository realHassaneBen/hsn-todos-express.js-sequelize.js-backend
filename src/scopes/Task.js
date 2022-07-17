import UserSensitiveData from "../constants/SensitiveData.js";
import {
    Comment,
    Label,
    Priority,
    Project,
    Task,
    User,
} from "../models/index.js";

Task.addScope("withAssociations", {
    include: [
        {
            model: User,
            attributes: {
                exclude: [...UserSensitiveData],
            },
        },
        { model: Label },
        { model: Priority },
        { model: Project },
        { model: Comment },
    ],
});

export default Task;
