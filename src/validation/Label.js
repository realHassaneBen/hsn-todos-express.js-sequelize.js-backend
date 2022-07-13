import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

const CreateLabelSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        TaskId: { type: "number" },
        UserId: { type: "number" },
    },
    required: ["name", "TaskId", "UserId"],
    additionalProperties: false,
};

const UpdateLabelSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        TaskId: { type: "number" },
        UserId: { type: "number" },
    },
    required: ["name", "TaskId", "UserId"],
    additionalProperties: false,
};

export const validateCreateLabel = (labelData) => {
    const valid = ajv.validate(CreateLabelSchema, labelData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
export const validateUpdateLabel = (labelData) => {
    const valid = ajv.validate(UpdateLabelSchema, labelData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
