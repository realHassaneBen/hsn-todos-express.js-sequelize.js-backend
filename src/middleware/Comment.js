import { findOneCommentQuery } from "../queries/comments.js";

const isCommentOwner = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { session, user } = req;

    if (!user.Comments || !user.Comments.length > 0) {
        return res.status(401).json({
            message: `You dont have any comments`,
        });
    }

    const isCommentOwner = user.Comments.find((comment) => comment.id === id);

    if (isCommentOwner) {
        return next();
    } else {
        return res.status(401).json({
            message: `You are not the owner of the comment`,
        });
    }
};

export { isCommentOwner };
