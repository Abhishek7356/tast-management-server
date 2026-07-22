import db from "../config/db.js";

export const findUserByEmail = async (email) => {
    const [rows] = await db.execute(
        `SELECT * FROM users WHERE email = ?`,
        [email]
    )

    return rows[0]
}

export const createUser = async (user) => {
    const { name, email, password, role } = user

    const [result] = await db.execute(
        `INSERT INTO users (name, email, password, role) VALUES(?,?,?,?)`,
        [name, email, password, role]
    )

    return result.insertId
}