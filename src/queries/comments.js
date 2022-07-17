import { Op } from "sequelize";
import { getPagination, getPagingData } from "../lib/handlePagination.js";
import { Comment } from "../scopes/index.js";

export const findAllCommentsQuery = async ({ page, size }, scope) => {
    const { limit, offset } = getPagination(page, size);

    const rows = await Comment.scope(scope).findAll({
        limit,
        offset,
    });
    const count = await Comment.count();
    const { totalItems, totalPages, currentPage } = getPagingData(
        count,
        page,
        limit
    );
    return {
        totalItems,
        totalPages,
        currentPage,
        count,
        rows,
    };
};
export const findAllCommentsWhereQuery = async (
    { page, size },
    scope,
    where
) => {
    const { limit, offset } = getPagination(page, size);

    const rows = await Comment.scope(scope).findAll({
        limit,
        offset,
        where,
    });
    const count = await Comment.count();
    const { totalItems, totalPages, currentPage } = getPagingData(
        count,
        page,
        limit
    );
    return {
        totalItems,
        totalPages,
        currentPage,
        count,
        rows,
    };
};
export const findAllCommentsBySearchQuery = async ({ query }) => {
    const queries = query
        .trim()
        .split(" ")
        .filter((q) => q !== "")
        .map((q) => ({ name: { [Op.like]: `%${q}%` } }));

    const comment = await Comment.scope("withAssociations").findAll({
        where: {
            [Op.or]: [...queries],
        },
    });
    return comment;
};
export const findByPkCommentQuery = async (id) => {
    const comment = await Comment.scope("withAssociations").findByPk(id);
    return comment;
};
export const findOneCommentQuery = async (where) => {
    const comment = await Comment.scope("withAssociations").findOne({ where });
    return comment;
};
export const createCommentQuery = async (commentData) => {
    const createdComment = await Comment.create(commentData);
    return createdComment;
};
export const updateCommentQuery = async (commentData, where) => {
    await Comment.update(commentData, { where });
    const updatedComment = await Comment.scope("withAssociations").findOne({
        where,
    });

    return updatedComment;
};
export const deleteCommentQuery = async (where) => {
    const deletedComment = await Comment.destroy({
        where,
    });
    return deletedComment;
};
