import { loginUser, registeUser } from "../services/auth.service.js";
import { create, getTasks, removeTask, update } from "../services/task.service.js";


export const createTaskController = async (req, res) => {
    try {
        const result = await create(req.body, req.user)

        res.status(201).json({
            success: true,
            message: "task created successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const getAllTasksController = async (req, res) => {
    try {
        const result = await getTasks(req.user)

        res.status(201).json({
            success: true,
            message: "tasks fetched successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const updateTasksController = async (req, res) => {
    try {
        const result = await update(req.params.id, req.body, req.user)

        res.status(201).json({
            success: true,
            message: "task updated successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteTasksController = async (req, res) => {
    try {
        const result = await removeTask(req.params.id, req.user)

        res.status(201).json({
            success: true,
            message: "task deleted successfully",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}