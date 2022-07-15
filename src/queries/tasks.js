import { Op } from "sequelize";
import { getPagination, getPagingData } from "../lib/handlePagination.js";
import { Task } from "../scopes/index.js";

export const findAllTasksQuery = async ({ page, size }, scope) => {
    const { limit, offset } = getPagination(page, size);

    const rows = await Task.scope(scope).findAll({
        limit,
        offset,
    });
    const count = await Task.count();
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
export const findAllTasksWhereQuery = async ({ page, size }, scope, where) => {
    const { limit, offset } = getPagination(page, size);

    const rows = await Task.scope(scope).findAll({
        limit,
        offset,
        where,
    });
    const count = await Task.count();
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
export const findAllTasksBySearchQuery = async ({ query }) => {
    const queries = query
        .trim()
        .split(" ")
        .filter((q) => q !== "")
        .map((q) => ({ name: { [Op.like]: `%${q}%` } }));

    const task = await Task.scope("withAssociations").findAll({
        where: {
            [Op.or]: [...queries],
        },
    });
    return task;
};
export const findByPkTaskQuery = async (id) => {
    const task = await Task.scope("withAssociations").findByPk(id);
    return task;
};
export const findOneTaskQuery = async (where) => {
    const task = await Task.scope("withAssociations").findOne({ where });
    return task;
};
export const createTaskQuery = async (taskData) => {
    const createdTask = await Task.create(taskData);
    if (taskData.LabelsIds) {
        taskData.LabelsIds.map(
            async (labelId) => await createdTask.addLabel(labelId)
        );
    }

    return createdTask;
};
export const updateTaskQuery = async (taskData, where) => {
    await Task.update(taskData, { where });
    const updatedTask = await Task.scope("withAssociations").findOne({
        where,
    });

    if (taskData.LabelsIds) {
        for (let index = 0; index < updatedTask.Labels.length; index++) {
            const element = updatedTask.Labels[index];
            await updatedTask.removeLabel(element.id);
        }
        for (let index = 0; index < taskData.LabelsIds.length; index++) {
            const element = taskData.LabelsIds[index];
            await updatedTask.addLabel(element);
        }
        // taskData.LabelsIds.map(
        //     async (labelId) => await updatedTask.addLabel(labelId)
        // );
        // updatedTask.Labels.map(
        //     async (label) => await updatedTask.removeLabel(label.id)
        // );
    }
    return updatedTask;
};
export const deleteTaskQuery = async (where) => {
    const deletedTask = await Task.destroy({
        where,
    });
    return deletedTask;
};
