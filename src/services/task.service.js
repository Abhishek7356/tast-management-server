import {
    createTask,
    deleteOwnTask,
    deleteTask,
    getAllTasks,
    getTaskByUser,
    updateOwnTask,
    updateTask
} from "../models/Task.js";


export const create = async (data, user) => {

    const taskId = await createTask({ ...data, userId: user.id })

    return { id: taskId }

}


export const getTasks = async (user, query) => {
    const {
        page = 1,
        limit = 10,
        search = "",
        status = ""
    } = query;
    if (user.role == "admin") {
        return await getAllTasks({
            page,
            limit,
            search,
            status
        })
    }

    return await getTaskByUser(
        user.id,
        {
            page,
            limit,
            search,
            status
        }
    )
}

export const update = async (id, data, user) => {


    let result;

    if (user.role == "admin") {
        result = await updateTask(id, data);
    } else {
        result = await updateOwnTask(id, user.id, data);
    }

    if (result === 0) {
        throw new Error("Task not found or access denied");
    }

    return result;

}

export const removeTask = async (id, user) => {

    let result;

    if (user.role == "admin") {
        result = await deleteTask(id);
    } else {
        result = await deleteOwnTask(id, user.id);
    }

    if (result === 0) {
        throw new Error("Task not found or access denied");
    }

    return result;

}

