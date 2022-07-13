import UserSensitiveData from "../constants/SensitiveData.js";

import {
    Image,
    Avatar,
    Role,
    User,
    Priority,
    Label,
    Project,
    Task,
} from "../models/index.js";

import {} from "./index.js";

User.addScope("withoutPassword", {
    attributes: {
        exclude: [...UserSensitiveData],
    },
});

User.addScope("withAssociations", {
    include: [Project, Task, Label, Priority, Image, Avatar, Role],
});

export default User;
