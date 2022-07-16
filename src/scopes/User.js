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
    include: [
        // Task,
        {
            model: Project,
            separate: true,
        },
        {
            model: Task,
            separate: true,
            include: [
                {
                    model: Label,
                },
                {
                    model: Priority,
                },
                {
                    model: Project,
                },
            ],
        },
        {
            model: Label,
            separate: true,
        },
        {
            model: Priority,
            separate: true,
        },
        {
            model: Image,
            separate: true,
        },
        {
            model: Avatar,
            separate: true,
        },
        { model: Role },
    ],
});

export default User;
