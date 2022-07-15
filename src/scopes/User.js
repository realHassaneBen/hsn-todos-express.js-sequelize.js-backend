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

User.addScope("withAssociationsx", {
    include: [
        // Task,
        {
            model: Project,
            attributes: ["id", "name"],
            separate: true, // <--- Run separate query
            limit: 5,
        },
        {
            model: Task,
            attributes: ["id", "title", "slug", "description", "due_date"],
            include: [
                {
                    model: Label,
                    attributes: ["id", "name"],
                },
                {
                    model: Priority,
                    attributes: ["id", "name"],
                },
                {
                    model: Project,
                    attributes: ["id", "name"],
                },
            ],
        },
        {
            model: Label,
            limit: 5,
            attributes: ["id", "name"],
        },
        {
            model: Priority,
            limit: 5,
            attributes: ["id", "name"],
        },
        {
            model: Image,
            limit: 5,
            attributes: ["id", "url"],
        },
        {
            model: Avatar,
            limit: 5,
            attributes: ["id", "url"],
        },
        { model: Role },
    ],
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
