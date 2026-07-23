import { TaskService } from "../services/task.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const createTaskController = asyncHandler(async (req, res) => {
    const result = await TaskService.create(req.body, req.user)

    res.status(201).json({
        success: true,
        message: "task created successfully",
        data: result
    });

})

export const getAllTasksController = asyncHandler(async (req, res) => {
    const result = await TaskService.getTasks(req.user, req.query)
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    res.status(200).json({
        success: true,
        data: result.tasks,
        pagination: {
            page,
            limit,
            total: result.total,
            totalPages: Math.max(1, Math.ceil(result.total / limit)),
        },
    });
})

export const updateTasksController = asyncHandler(async (req, res) => {
    const result = await TaskService.update(req.params.id, req.body, req.user)

    res.status(200).json({
        success: true,
        message: "task updated successfully",
        data: result
    });
})

export const deleteTasksController = asyncHandler(async (req, res) => {
    const result = await TaskService.removeTask(req.params.id, req.user)

    res.status(200).json({
        success: true,
        message: "task deleted successfully",
        data: result
    });
})