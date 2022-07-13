import UserSensitiveData from "../constants/SensitiveData.js";
import { Priority, Task, User } from "../models/index.js";

Priority.addScope("withAssociations", {
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

export default Priority;
