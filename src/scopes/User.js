import UserSensitiveData from "../constants/SensitiveData.js";

import { Image, Avatar, Role, User } from "../models/index.js";

import {} from "./index.js";

User.addScope("withoutPassword", {
    attributes: {
        exclude: [...UserSensitiveData],
    },
});

User.addScope("withAssociations", {
    include: [Image, Avatar, Role],
});

export default User;
