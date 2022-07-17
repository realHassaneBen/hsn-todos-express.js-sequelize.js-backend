import { getPagination } from "../lib/handlePagination.js";
import {
    createTaskQuery,
    deleteTaskQuery,
    findAllTasksBySearchQuery,
    findAllTasksQuery,
    findAllTasksWhereQuery,
    findOneTaskQuery,
    updateTaskQuery,
} from "../queries/tasks.js";
import { validateCreateTask, validateUpdateTask } from "../validation/Task.js";

export const getTasks = async (request, response) => {
    const { page, size } = request.query;
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllTasksQuery(params, ["withAssociations"]);
    if (data) {
        return response.status(200).json(data);
    } else {
        return response.status(404).json({ message: "No tasks found" });
    }
};
export const getTasksBySearch = async (request, response) => {
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
export const getTaskById = async (request, response) => {
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
export const getTaskByName = async (request, response) => {
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
export const getTasksByUserId = async (request, response) => {
    const UserId = parseInt(request.params.id);
    const { page, size } = request.query;
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllTasksWhereQuery(params, ["withAssociations"], {
        UserId,
    });
    if (data) {
        return response.status(200).json(data);
    } else {
        return response.status(404).json({ message: "No tasks found" });
    }
};

export const createTask = async (request, response) => {
    const { session, user } = request;

    const { title, description, ProjectId, dueDate, LabelsIds, PriorityId } =
        request.body;
    const taskData = {
        title,
        description,
        due_date: new Date(dueDate).toISOString(),
        UserId: user.id,
    };
    if (PriorityId && !isNaN(PriorityId)) {
        taskData.PriorityId = parseInt(PriorityId);
    }
    if (ProjectId && !isNaN(ProjectId)) {
        taskData.ProjectId = parseInt(ProjectId);
    }
    if (LabelsIds) {
        taskData.LabelsIds = LabelsIds.filter((labelId) => !isNaN(labelId)).map(
            (labelId) => parseInt(labelId)
        );
    }
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
export const updateTask = async (request, response) => {
    const id = parseInt(request.params.id);
    const { session, user } = request;

    const { title, description, ProjectId, dueDate, LabelsIds, PriorityId } =
        request.body;

    const taskData = {
        title,
        description,
        due_date: new Date(dueDate).toISOString(),
        UserId: user.id,
    };
    if (PriorityId && !isNaN(PriorityId)) {
        taskData.PriorityId = parseInt(PriorityId);
    }
    if (ProjectId && !isNaN(ProjectId)) {
        taskData.ProjectId = parseInt(ProjectId);
    }
    if (LabelsIds) {
        taskData.LabelsIds = LabelsIds.filter((labelId) => !isNaN(labelId)).map(
            (labelId) => parseInt(labelId)
        );
    }

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
export const deleteTask = async (request, response) => {
    const id = parseInt(request.params.id);
    await deleteTaskQuery({ id });
    response.status(200).json({ message: `Task deleted with ID: ${id}` });
};
