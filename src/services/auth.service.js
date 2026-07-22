import { createUser, findUserByEmail } from "../models/User.js";
import bcrypt from "bcrypt";


export const registeUser = async (data) => {
    try {
        const { name, email, password, role = "user" } = data;
        const existingUser = await findUserByEmail(email)

        if (existingUser) {
            throw new Error("Email already exist");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = await createUser({ name, email, password: hashedPassword, role: role })

        return {
            id: userId,
            name,
            email,
            role: role || "user"
        };
    } catch (error) {
        console.error(error)
        throw new Error(error.message)
    }
}