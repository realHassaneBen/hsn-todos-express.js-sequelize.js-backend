import { Op } from "sequelize";
import { Review } from "../scopes/index.js";
import { findByPkProductQuery } from "./products.js";

const findAllReviewsQuery = async () => {
    const reviews = await Review.scope("withAssociations").findAll();
    return reviews;
};
const findAllReviewsBySearchQuery = async ({ query }) => {
    const queries = query
        .trim()
        .split(" ")
        .filter((q) => q !== "")
        .map((q) => ({ name: { [Op.like]: `%${q}%` } }));

    const review = await Review.scope("withAssociations").findAll({
        where: {
            [Op.or]: [...queries],
        },
    });
    return review;
};
const findByPkReviewQuery = async (id) => {
    const review = await Review.scope("withAssociations").findByPk(id);
    return review;
};
const findOneReviewQuery = async (where) => {
    const review = await Review.scope("withAssociations").findOne({ where });
    return review;
};

const createReviewQuery = async (reviewData) => {
    const product = await findByPkProductQuery(reviewData.productId);
    const createdReview = await product.createReview(reviewData);
    const review = await findByPkReviewQuery(createdReview.id);
    return review;
};

const updateReviewQuery = async (reviewData, where) => {
    await Review.update(reviewData, { where });
    const updatedReview = await Review.scope("withAssociations").findOne({
        where,
    });
    return updatedReview;
};

const deleteReviewQuery = async (where) => {
    const deletedReview = await Review.destroy({
        where,
    });
    return deletedReview;
};

export {
    findAllReviewsQuery,
    findAllReviewsBySearchQuery,
    findByPkReviewQuery,
    findOneReviewQuery,
    createReviewQuery,
    updateReviewQuery,
    deleteReviewQuery,
};
