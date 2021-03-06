import UserSensitiveData from "../constants/SensitiveData.js";
import { Project, Task, User } from "../models/index.js";

Project.addScope("withAssociations", {
    include: [
        {
            model: User,
            attributes: {
                exclude: [...UserSensitiveData],
            },
        },
        { model: Task },
    ],
});

export default Project;
