import { Op } from "sequelize";
import { Project } from "../scopes/index.js";

const findAllProjectsQuery = async () => {
    const projects = await Project.scope("withAssociations").findAll();
    return projects;
};
const findAllProjectsBySearchQuery = async ({ query }) => {
    const queries = query
        .trim()
        .split(" ")
        .filter((q) => q !== "")
        .map((q) => ({ name: { [Op.like]: `%${q}%` } }));

    const project = await Project.scope("withAssociations").findAll({
        where: {
            [Op.or]: [...queries],
        },
    });
    return project;
};
const findByPkProjectQuery = async (id) => {
    const project = await Project.scope("withAssociations").findByPk(id);
    return project;
};
const findOneProjectQuery = async (where) => {
    const project = await Project.scope("withAssociations").findOne({ where });
    return project;
};

const createProjectQuery = async (projectData) => {
    const createdProject = await Project.create(projectData);
    return createdProject;
};

const updateProjectQuery = async (projectData, where) => {
    await Project.update(projectData, { where });
    const updatedProject = await Project.scope("withAssociations").findOne({
        where,
    });
    updatedProject.categories.map(
        async (c) => await updatedProject.removeCategory(c.id)
    );
    projectData.CategoriesIds.map(
        async (ci) => await updatedProject.addCategory(ci)
    );
    return updatedProject;
};

const deleteProjectQuery = async (where) => {
    const deletedProject = await Project.destroy({
        where,
    });
    return deletedProject;
};

export {
    findAllProjectsQuery,
    findAllProjectsBySearchQuery,
    findByPkProjectQuery,
    findOneProjectQuery,
    createProjectQuery,
    updateProjectQuery,
    deleteProjectQuery,
};
