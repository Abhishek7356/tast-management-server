import { Router } from "express";
import {
    createTaskController,
    deleteTasksController,
    getAllTasksController,
    updateTasksController
} from "../controllers/task.controller.js";
import { authenticate } from "../middlewares/auth.middlewar.js";

const router = Router()

router.use(authenticate)

router.get("/", getAllTasksController);

router.post("/", createTaskController);

router.put("/:id", updateTasksController);

router.delete("/:id", deleteTasksController);

export default router