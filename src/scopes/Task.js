import UserSensitiveData from "../constants/SensitiveData.js";
import { Label, Priority, Project, Task, User } from "../models/index.js";

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
    ],
});

export default Task;
