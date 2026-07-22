import Joi from "joi";

export const createTaskSchema = Joi.object({
    title: Joi.string().required(),

    description: Joi.string().required(),

    status: Joi.string()
        .valid("Pending", "In Progress", "Completed")
        .default("Pending"),
});

export const updateTaskSchema = Joi.object({
    title: Joi.string().trim().min(3).max(255),

    description: Joi.string().required(),

    status: Joi.string().valid(
        "Pending",
        "In Progress",
        "Completed"
    ),
})