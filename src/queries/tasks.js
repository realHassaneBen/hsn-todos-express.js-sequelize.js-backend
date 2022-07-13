import { Op } from "sequelize";
import { Task } from "../scopes/index.js";

const findAllTasksQuery = async () => {
    const tasks = await Task.scope("withAssociations").findAll();
    return tasks;
};
const findAllTasksBySearchQuery = async ({ query }) => {
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
const findByPkTaskQuery = async (id) => {
    const task = await Task.scope("withAssociations").findByPk(id);
    return task;
};
const findOneTaskQuery = async (where) => {
    const task = await Task.scope("withAssociations").findOne({ where });
    return task;
};

const createTaskQuery = async (taskData) => {
    const createdTask = await Task.create(taskData);
    return createdTask;
};

const updateTaskQuery = async (taskData, where) => {
    await Task.update(taskData, { where });
    const updatedTask = await Task.scope("withAssociations").findOne({
        where,
    });
    updatedTask.categories.map(
        async (c) => await updatedTask.removeCategory(c.id)
    );
    taskData.CategoriesIds.map(async (ci) => await updatedTask.addCategory(ci));
    return updatedTask;
};

const deleteTaskQuery = async (where) => {
    const deletedTask = await Task.destroy({
        where,
    });
    return deletedTask;
};

export {
    findAllTasksQuery,
    findAllTasksBySearchQuery,
    findByPkTaskQuery,
    findOneTaskQuery,
    createTaskQuery,
    updateTaskQuery,
    deleteTaskQuery,
};
