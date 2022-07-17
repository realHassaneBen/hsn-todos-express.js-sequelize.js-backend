import { Comment, User, Task } from "../models/index.js";

// belongsTo
Comment.belongsTo(User);
Comment.belongsTo(Task);

export default Comment;
