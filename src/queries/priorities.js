import { Op } from "sequelize";
import { Priority } from "../scopes/index.js";

const findAllPrioritiesQuery = async () => {
    const priorities = await Priority.scope("withAssociations").findAll();
    return priorities;
};
const findAllPrioritiesBySearchQuery = async ({ query }) => {
    const queries = query
        .trim()
        .split(" ")
        .filter((q) => q !== "")
        .map((q) => ({ name: { [Op.like]: `%${q}%` } }));

    const priorities = await Priority.scope("withAssociations").findAll({
        where: {
            [Op.or]: [...queries],
        },
    });
    return priorities;
};
const findByPkPriorityQuery = async (id) => {
    const priority = await Priority.scope("withAssociations").findByPk(id);
    return priority;
};
const findOnePriorityQuery = async (where) => {
    const priority = await Priority.scope("withAssociations").findOne({
        where,
    });
    return priority;
};

const createPriorityQuery = async (priorityData) => {
    const createdPriority = await Priority.create(priorityData);
    return createdPriority;
};

const updatePriorityQuery = async (priorityData, where) => {
    await Priority.update(priorityData, { where });
    const updatedPriority = await Priority.scope("withAssociations").findOne({
        where,
    });

    return updatedPriority;
};

const deletePriorityQuery = async (where) => {
    const deletedPriority = await Priority.destroy({
        where,
    });
    return deletedPriority;
};

export {
    findAllPrioritiesQuery,
    findAllPrioritiesBySearchQuery,
    findByPkPriorityQuery,
    findOnePriorityQuery,
    createPriorityQuery,
    updatePriorityQuery,
    deletePriorityQuery,
};
