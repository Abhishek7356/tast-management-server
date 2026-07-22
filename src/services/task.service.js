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
    try {

        const taskId = await createTask({ ...data, userId: user.id })

        return { id: taskId }
    } catch (error) {
        console.error(error)
        throw new Error(error.message)
    }
}


export const getTasks = async (user) => {
    try {

        if (user.role == "admin") {
            return await getAllTasks()
        }

        return await getTaskByUser(user.id)
    } catch (error) {
        console.error(error)
        throw new Error(error.message)
    }
}

export const update = async (id, data, user) => {
    try {

        if (user.role == "admin") {
            return await updateTask(id, data)
        }

        return await updateOwnTask(id, user.id, data)
    } catch (error) {
        console.error(error)
        throw new Error(error.message)
    }
}

export const removeTask = async (id, user) => {
    try {

        if (user.role == "admin") {
            return await deleteTask(id)
        }

        return await deleteOwnTask(id, user.id)
    } catch (error) {
        console.error(error)
        throw new Error(error.message)
    }
}

