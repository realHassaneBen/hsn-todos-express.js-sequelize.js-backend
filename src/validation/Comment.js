import Ajv from "ajv";

const ajv = new Ajv();

const CreateCommentSchema = {
    type: "object",
    properties: {
        content: { type: "string" },
        TaskId: { type: "number" },
        UserId: { type: "number" },
    },
    required: ["content", "TaskId", "UserId"],
    additionalProperties: false,
};

const UpdateCommentSchema = {
    type: "object",
    properties: {
        content: { type: "string" },
        TaskId: { type: "number" },
        UserId: { type: "number" },
    },
    required: ["content", "TaskId", "UserId"],
    additionalProperties: false,
};

export const validateCreateComment = (commentData) => {
    const valid = ajv.validate(CreateCommentSchema, commentData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
export const validateUpdateComment = (commentData) => {
    const valid = ajv.validate(UpdateCommentSchema, commentData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
