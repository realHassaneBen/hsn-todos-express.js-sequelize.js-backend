import {
    createTaskQuery,
    deleteTaskQuery,
    findAllTasksBySearchQuery,
    findAllTasksQuery,
    findOneTaskQuery,
    updateTaskQuery,
} from "../queries/tasks.js";
import { validateCreateTask, validateUpdateTask } from "../validation/Task.js";

const getTasks = async (request, response) => {
    const tasks = await findAllTasksQuery();
    if (tasks) {
        response.status(200).json({
            message: `Tasks found`,
            tasks,
        });
    } else {
        response.status(404).json({ message: "No tasks found" });
    }
};
const getTasksBySearch = async (request, response) => {
    const query = request.params.query;

    const tasks = await findAllTasksBySearchQuery({ query });
    if (tasks) {
        return response.status(200).json({
            message: `Tasks found with query: ${query}, `,
            length: tasks.length,
            tasks,
        });
    } else {
        return response
            .status(404)
            .json({ message: `Task not found with Query: ${query}` });
    }
};
const getTaskById = async (request, response) => {
    const id = parseInt(request.params.id);
    const task = await findOneTaskQuery({ id });
    if (task) {
        response.status(200).json({
            message: `Task found with ID: ${id}`,
            task,
        });
    } else {
        response.status(404).json({
            message: `Task not found with ID: ${id}`,
        });
    }
};
const getTaskByName = async (request, response) => {
    const slug = request.params.slug;
    const task = await findOneTaskQuery({ slug });
    if (task) {
        response.status(200).json({
            message: `Task found with ID: ${slug}`,
            task,
        });
    } else {
        response.status(404).json({
            message: `Task not found with ID: ${slug}`,
        });
    }
};

const createTask = async (request, response) => {
    const { session, user } = request;

    const { title, description, ProjectId, dueDate } = request.body;
    const taskData = {
        title,
        description,
        due_date: new Date(dueDate).toISOString(),
        ProjectId: parseInt(ProjectId),
        UserId: user.id,
    };
    const isTaskValid = validateCreateTask(taskData);

    if (!isTaskValid.valid) {
        return response.status(400).json({
            message: "Invalid task data",
            errors: isTaskValid.errors,
        });
    }

    const createdTask = await createTaskQuery(taskData);

    if (createdTask) {
        return response.status(201).json({
            message: `Task added with ID: ${createdTask.id}`,
            data: createdTask,
        });
    } else {
        return response.status(500).json({ message: `Faile to create a task` });
    }
};

const updateTask = async (request, response) => {
    const id = parseInt(request.params.id);
    const { session, user } = request;

    const { name, username, about, title, description, CategoriesIds } =
        request.body;

    const taskData = {
        name,
        username,
        title,
        description,
        about,
        CategoriesIds,
        UserId: user.id,
    };

    const isTaskValid = validateUpdateTask(taskData);

    if (!isTaskValid) {
        response.status(400).json({ message: "Task not updated" });
    }

    const updatedTask = await updateTaskQuery(taskData, { id });

    if (updatedTask) {
        response.status(200).json({
            message: `Task updated with ID: ${updatedTask[0]?.id}`,
            data: updatedTask,
        });
    } else {
        response.status(500).json({
            message: `Faile to update a task, ${id}`,
        });
    }
};

const deleteTask = async (request, response) => {
    const id = parseInt(request.params.id);
    await deleteTaskQuery({ id });
    response.status(200).json({ message: `Task deleted with ID: ${id}` });
};

export {
    getTasks,
    getTaskById,
    getTasksBySearch,
    getTaskByName,
    createTask,
    updateTask,
    deleteTask,
};
