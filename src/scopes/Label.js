import UserSensitiveData from "../constants/SensitiveData.js";
import { Label, Task, User } from "../models/index.js";

Label.addScope("withAssociations", {
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

export default Label;
