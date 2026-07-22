import { Router } from "express";
import {
    createTaskController,
    deleteTasksController,
    getAllTasksController,
    updateTasksController
} from "../controllers/task.controller.js";
import { authenticate } from "../middlewares/auth.middlewar.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createTaskSchema, updateTaskSchema } from "../validators/task.validator.js";

const router = Router()

router.use(authenticate)

router.get("/", getAllTasksController);

router.post("/", validate(createTaskSchema), createTaskController);

router.put("/:id", validate(updateTaskSchema), updateTasksController);

router.delete("/:id", deleteTasksController);

export default router