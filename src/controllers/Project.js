import {
    createProjectQuery,
    deleteProjectQuery,
    findAllProjectsBySearchQuery,
    findAllProjectsQuery,
    findOneProjectQuery,
    updateProjectQuery,
} from "../queries/projects.js";
import {
    validateCreateProject,
    validateUpdateProject,
} from "../validation/Project.js";

const getProjects = async (request, response) => {
    const projects = await findAllProjectsQuery();
    if (projects) {
        response.status(200).json({
            message: `Projects found`,
            projects,
        });
    } else {
        response.status(404).json({ message: "No projects found" });
    }
};
const getProjectsBySearch = async (request, response) => {
    const query = request.params.query;

    const projects = await findAllProjectsBySearchQuery({ query });
    if (projects) {
        return response.status(200).json({
            message: `Projects found with query: ${query}, `,
            length: projects.length,
            projects,
        });
    } else {
        return response
            .status(404)
            .json({ message: `Project not found with Query: ${query}` });
    }
};
const getProjectById = async (request, response) => {
    const id = parseInt(request.params.id);
    const project = await findOneProjectQuery({ id });
    if (project) {
        response.status(200).json({
            message: `Project found with ID: ${id}`,
            project,
        });
    } else {
        response.status(404).json({
            message: `Project not found with ID: ${id}`,
        });
    }
};
const getProjectByName = async (request, response) => {
    const slug = request.params.slug;
    const project = await findOneProjectQuery({ slug });
    if (project) {
        response.status(200).json({
            message: `Project found with ID: ${slug}`,
            project,
        });
    } else {
        response.status(404).json({
            message: `Project not found with ID: ${slug}`,
        });
    }
};

const createProject = async (request, response) => {
    const { session, user } = request;

    const { name } = request.body;
    const projectData = {
        name,
        UserId: user.id,
    };

    const isProjectValid = validateCreateProject(projectData);

    if (!isProjectValid.valid) {
        return response.status(400).json({
            message: "Invalid project data",
            errors: isProjectValid.errors,
        });
    }

    const createdProject = await createProjectQuery(projectData);

    if (createdProject) {
        return response.status(201).json({
            message: `Project added with ID: ${createdProject.id}`,
            data: createdProject,
        });
    } else {
        return response
            .status(500)
            .json({ message: `Faile to create a project` });
    }
};

const updateProject = async (request, response) => {
    const id = parseInt(request.params.id);
    const { session, user } = request;

    const { name, username, about, title, description, CategoriesIds } =
        request.body;

    const projectData = {
        name,
        username,
        title,
        description,
        about,
        CategoriesIds,
        UserId: user.id,
    };

    const isProjectValid = validateUpdateProject(projectData);

    if (!isProjectValid) {
        response.status(400).json({ message: "Project not updated" });
    }

    const updatedProject = await updateProjectQuery(projectData, { id });

    if (updatedProject) {
        response.status(200).json({
            message: `Project updated with ID: ${updatedProject[0]?.id}`,
            data: updatedProject,
        });
    } else {
        response.status(500).json({
            message: `Faile to update a project, ${id}`,
        });
    }
};

const deleteProject = async (request, response) => {
    const id = parseInt(request.params.id);
    await deleteProjectQuery({ id });
    response.status(200).json({ message: `Project deleted with ID: ${id}` });
};

export {
    getProjects,
    getProjectById,
    getProjectsBySearch,
    getProjectByName,
    createProject,
    updateProject,
    deleteProject,
};
