import {
    createCommentQuery,
    deleteCommentQuery,
    findAllCommentsBySearchQuery,
    findAllCommentsQuery,
    findAllCommentsWhereQuery,
    findOneCommentQuery,
    updateCommentQuery,
} from "../queries/comments.js";
import {
    validateCreateComment,
    validateUpdateComment,
} from "../validation/Comment.js";

export const getComments = async (request, response) => {
    const { page, size } = request.query;
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllCommentsQuery(params, ["withAssociations"]);

    if (data) {
        return response.status(200).json(data);
    } else {
        return response.status(404).json({ message: "No Comments found" });
    }
};
export const getCommentsByUserId = async (request, response) => {
    const UserId = parseInt(request.params.id);
    if (isNaN(UserId)) {
        return response.status(400).json({ message: "Invalid UserId" });
    }
    const { page, size } = request.query;
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllCommentsWhereQuery(params, ["withAssociations"], {
        UserId,
    });

    if (data) {
        return response.status(200).json(data);
    } else {
        return response.status(404).json({ message: "No Comments found" });
    }
};
export const getCommentsByTaskId = async (request, response) => {
    const TaskId = parseInt(request.params.id);
    if (isNaN(TaskId)) {
        return response.status(400).json({ message: "Invalid TaskId" });
    }
    const { page, size } = request.query;
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllCommentsWhereQuery(params, ["withAssociations"], {
        TaskId,
    });

    if (data) {
        return response.status(200).json(data);
    } else {
        return response.status(404).json({ message: "No Comments found" });
    }
};
export const getCommentsBySearch = async (request, response) => {
    const query = request.params.query;
    if (!query) {
        return response.status(400).json({ message: "Invalid Query" });
    }

    const comments = await findAllCommentsBySearchQuery({ query });
    if (comments) {
        return response.status(200).json({
            message: `Comments found with query: ${query}, `,
            length: comments.length,
            comments,
        });
    } else {
        return response
            .status(404)
            .json({ message: `Comment not found with Query: ${query}` });
    }
};
export const getCommentById = async (request, response) => {
    const id = parseInt(request.params.id);
    if (isNaN(id)) {
        return response.status(400).json({ message: "Invalid ID" });
    }
    const comment = await findOneCommentQuery({ id });
    if (comment) {
        return response.status(200).json({
            message: `Comment found with ID: ${id}`,
            comment,
        });
    } else {
        return response.status(404).json({
            message: `Comment not found with ID: ${id}`,
        });
    }
};
export const getCommentByName = async (request, response) => {
    const slug = request.params.slug;
    const comment = await findOneCommentQuery({ slug });
    if (comment) {
        return response.status(200).json({
            message: `Comment found with ID: ${slug}`,
            comment,
        });
    } else {
        return response.status(404).json({
            message: `Comment not found with ID: ${slug}`,
        });
    }
};
export const createComment = async (request, response) => {
    const { session, user } = request;

    const { content, TaskId } = request.body;
    const commentData = {
        content,
        TaskId: parseInt(TaskId),
        UserId: user.id,
    };

    const isCommentValid = validateCreateComment(commentData);

    if (!isCommentValid.valid) {
        return response.status(400).json({
            message: "Invalid comment data",
            errors: isCommentValid.errors,
        });
    }

    const createdComment = await createCommentQuery(commentData);

    if (createdComment) {
        return response.status(201).json({
            message: `Comment added with ID: ${createdComment.id}`,
            data: createdComment,
        });
    } else {
        return response
            .status(500)
            .json({ message: `Faile to create a comment` });
    }
};
export const updateComment = async (request, response) => {
    const id = parseInt(request.params.id);
    const { session, user } = request;

    const { content, TaskId } = request.body;
    const commentData = {
        content,
        TaskId: parseInt(TaskId),
        UserId: user.id,
    };

    const isCommentValid = validateUpdateComment(commentData);
    if (!isCommentValid.valid) {
        return response.status(400).json({
            message: "Invalid comment data",
            errors: isCommentValid.errors,
        });
    }

    const updatedComment = await updateCommentQuery(commentData, { id });

    if (updatedComment) {
        return response.status(200).json({
            message: `Comment updated with ID: ${updatedComment[0]?.id}`,
            data: updatedComment,
        });
    } else {
        return response.status(500).json({
            message: `Faile to update a comment, ${id}`,
        });
    }
};
export const deleteComment = async (request, response) => {
    const id = parseInt(request.params.id);
    await deleteCommentQuery({ id });
    return response
        .status(200)
        .json({ message: `Comment deleted with ID: ${id}` });
};
