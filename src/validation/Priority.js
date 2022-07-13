import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

const CreatePrioritySchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        query: { type: "string" },
        TaskId: { type: "number" },
        UserId: { type: "number" },
    },
    required: ["name", "query", "TaskId", "UserId"],
    additionalProperties: false,
};

const UpdatePrioritySchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        query: { type: "string" },
        TaskId: { type: "number" },
        UserId: { type: "number" },
    },
    required: ["name", "query", "TaskId", "UserId"],
    additionalProperties: false,
};

export const validateCreatePriority = (priorityData) => {
    const valid = ajv.validate(CreatePrioritySchema, priorityData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
export const validateUpdatePriority = (priorityData) => {
    const valid = ajv.validate(UpdatePrioritySchema, priorityData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
