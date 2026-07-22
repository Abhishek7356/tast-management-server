import db from "../config/db.js";


export const createTask = async (data) => {
    try {
        const { title, description, status, userId } = data

        const [task] = await db.execute(
            `INSERT INTO tasks (title, description, status, user_id) VALUES(?,?,?,?)`,
            [title, description, status, userId]
        )
        return task.insertId
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getAllTasks = async () => {
    try {
        const [task] = await db.execute(
            `
            SELECT 
            tasks.*,
            users.name AS user_name
            FROM tasks
            JOIN users
            ON tasks.user_id = users.id
            ORDER BY tasks.created_at DESC
            `
        )
        return tasks
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getTaskByUser = async (userId) => {
    try {

        const [tasks] = await db.execute(
            `SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC`,
            [userId]
        )
        return tasks
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getTaskById = async (id) => {
    try {

        const [tasks] = await db.execute(
            `SELECT * FROM tasks WHERE id = ?`,
            [id]
        )
        return tasks[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateTask = async (id, task) => {
    console.log(id, task)
    try {
        const { title, description, status } = task
        const [result] = await db.execute(
            `UPDATE tasks 
            SET title=?, 
                description=?,
                status=? 
            WHERE id = ?`,
            [title, description, status, id]
        )
        return result.affectedRows
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateOwnTask = async (id, userId, task) => {
    try {
        console.log(id, task)
        const { title, description, status } = task
        const [result] = await db.execute(
            `UPDATE tasks 
            SET title=?,
                description=?,
                status=?
            WHERE id = ? 
            AND user_id = ?`,
            [title, description, status, id, userId]
        )
        return result.affectedRows
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteTask = async (id) => {
    try {
        const [result] = await db.execute(
            `DELETE FROM tasks WHERE id = ?`,
            [id]
        )
        return result.affectedRows
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteOwnTask = async (id, userId) => {
    try {
        const [result] = await db.execute(
            `DELETE FROM tasks WHERE id = ? AND user_id=?`,
            [id, userId]
        )
        return result.affectedRows
    } catch (error) {
        throw new Error(error.message)
    }
}

