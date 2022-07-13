import {
    createLabelQuery,
    deleteLabelQuery,
    findAllLabelsBySearchQuery,
    findAllLabelsQuery,
    findOneLabelQuery,
    updateLabelQuery,
} from "../queries/labels.js";
import {
    validateCreateLabel,
    validateUpdateLabel,
} from "../validation/Label.js";

const getLabels = async (request, response) => {
    const labels = await findAllLabelsQuery();
    if (labels) {
        response.status(200).json({
            message: `Labels found`,
            labels,
        });
    } else {
        response.status(404).json({ message: "No labels found" });
    }
};
const getLabelsBySearch = async (request, response) => {
    const query = request.params.query;

    const labels = await findAllLabelsBySearchQuery({ query });
    if (labels) {
        return response.status(200).json({
            message: `Labels found with query: ${query}, `,
            length: labels.length,
            labels,
        });
    } else {
        return response
            .status(404)
            .json({ message: `Label not found with Query: ${query}` });
    }
};
const getLabelById = async (request, response) => {
    const id = parseInt(request.params.id);
    const label = await findOneLabelQuery({ id });
    if (label) {
        response.status(200).json({
            message: `Label found with ID: ${id}`,
            label,
        });
    } else {
        response.status(404).json({
            message: `Label not found with ID: ${id}`,
        });
    }
};
const getLabelByName = async (request, response) => {
    const slug = request.params.slug;
    const label = await findOneLabelQuery({ slug });
    if (label) {
        response.status(200).json({
            message: `Label found with ID: ${slug}`,
            label,
        });
    } else {
        response.status(404).json({
            message: `Label not found with ID: ${slug}`,
        });
    }
};

const createLabel = async (request, response) => {
    const { session, user } = request;

    const { name, TaskId } = request.body;
    const labelData = {
        name,
        TaskId: parseInt(TaskId),
        UserId: user.id,
    };
    const isLabelValid = validateCreateLabel(labelData);

    if (!isLabelValid.valid) {
        return response.status(400).json({
            message: "Invalid label data",
            errors: isLabelValid.errors,
        });
    }

    const createdLabel = await createLabelQuery(labelData);

    if (createdLabel) {
        return response.status(201).json({
            message: `Label added with ID: ${createdLabel.id}`,
            data: createdLabel,
        });
    } else {
        return response
            .status(500)
            .json({ message: `Faile to create a label` });
    }
};

const updateLabel = async (request, response) => {
    const id = parseInt(request.params.id);
    const { session, user } = request;

    const { name, username, about, title, description, CategoriesIds } =
        request.body;

    const labelData = {
        name,
        username,
        title,
        description,
        about,
        CategoriesIds,
        UserId: user.id,
    };

    const isLabelValid = validateUpdateLabel(labelData);

    if (!isLabelValid) {
        response.status(400).json({ message: "Label not updated" });
    }

    const updatedLabel = await updateLabelQuery(labelData, { id });

    if (updatedLabel) {
        response.status(200).json({
            message: `Label updated with ID: ${updatedLabel[0]?.id}`,
            data: updatedLabel,
        });
    } else {
        response.status(500).json({
            message: `Faile to update a label, ${id}`,
        });
    }
};

const deleteLabel = async (request, response) => {
    const id = parseInt(request.params.id);
    await deleteLabelQuery({ id });
    response.status(200).json({ message: `Label deleted with ID: ${id}` });
};

export {
    getLabels,
    getLabelById,
    getLabelsBySearch,
    getLabelByName,
    createLabel,
    updateLabel,
    deleteLabel,
};
