import {
    createPriorityQuery,
    deletePriorityQuery,
    findAllPrioritiesBySearchQuery,
    findAllPrioritiesQuery,
    findOnePriorityQuery,
    updatePriorityQuery,
} from "../queries/priorities.js";
import {
    validateCreatePriority,
    validateUpdatePriority,
} from "../validation/Priority.js";

const getPriorities = async (request, response) => {
    const priorities = await findAllPrioritiesQuery();
    if (priorities) {
        response.status(200).json({
            message: `Priorities found`,
            priorities,
        });
    } else {
        response.status(404).json({ message: "No priorities found" });
    }
};
const getPrioritiesBySearch = async (request, response) => {
    const query = request.params.query;

    const priorities = await findAllPrioritiesBySearchQuery({ query });
    if (priorities) {
        return response.status(200).json({
            message: `Priorities found with query: ${query}, `,
            length: priorities.length,
            priorities,
        });
    } else {
        return response
            .status(404)
            .json({ message: `Priority not found with Query: ${query}` });
    }
};
const getPriorityById = async (request, response) => {
    const id = parseInt(request.params.id);
    const priority = await findOnePriorityQuery({ id });
    if (priority) {
        response.status(200).json({
            message: `Priority found with ID: ${id}`,
            priority,
        });
    } else {
        response.status(404).json({
            message: `Priority not found with ID: ${id}`,
        });
    }
};
const getPriorityByName = async (request, response) => {
    const slug = request.params.slug;
    const priority = await findOnePriorityQuery({ slug });
    if (priority) {
        response.status(200).json({
            message: `Priority found with ID: ${slug}`,
            priority,
        });
    } else {
        response.status(404).json({
            message: `Priority not found with ID: ${slug}`,
        });
    }
};

const createPriority = async (request, response) => {
    const { session, user } = request;

    const { name, query, TaskId } = request.body;
    const priorityData = {
        name,
        query,
        TaskId: parseInt(TaskId),
        UserId: user.id,
    };
    const isPriorityValid = validateCreatePriority(priorityData);

    if (!isPriorityValid.valid) {
        return response.status(400).json({
            message: "Invalid priority data",
            errors: isPriorityValid.errors,
        });
    }

    const createdPriority = await createPriorityQuery(priorityData);

    if (createdPriority) {
        return response.status(201).json({
            message: `Priority added with ID: ${createdPriority.id}`,
            data: createdPriority,
        });
    } else {
        return response
            .status(500)
            .json({ message: `Faile to create a priority` });
    }
};

const updatePriority = async (request, response) => {
    const id = parseInt(request.params.id);
    const { session, user } = request;

    const { name, username, about, title, description, CategoriesIds } =
        request.body;

    const priorityData = {
        name,
        username,
        title,
        description,
        about,
        CategoriesIds,
        UserId: user.id,
    };

    const isPriorityValid = validateUpdatePriority(priorityData);

    if (!isPriorityValid) {
        response.status(400).json({ message: "Priority not updated" });
    }

    const updatedPriority = await updatePriorityQuery(priorityData, { id });

    if (updatedPriority) {
        response.status(200).json({
            message: `Priority updated with ID: ${updatedPriority[0]?.id}`,
            data: updatedPriority,
        });
    } else {
        response.status(500).json({
            message: `Faile to update a priority, ${id}`,
        });
    }
};

const deletePriority = async (request, response) => {
    const id = parseInt(request.params.id);
    await deletePriorityQuery({ id });
    response.status(200).json({ message: `Priority deleted with ID: ${id}` });
};

export {
    getPriorities,
    getPriorityById,
    getPrioritiesBySearch,
    getPriorityByName,
    createPriority,
    updatePriority,
    deletePriority,
};
