import UserSensitiveData from "../constants/SensitiveData.js";
import { Comment, Task, User } from "../models/index.js";

Comment.addScope("withAssociations", {
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

export default Comment;
