import UserSensitiveData from "../constants/SensitiveData.js";
import { Project, User } from "../models/index.js";

Project.addScope("withAssociations", {
    include: [
        {
            model: User,
            attributes: {
                exclude: [...UserSensitiveData],
            },
        },
    ],
});

export default Project;
