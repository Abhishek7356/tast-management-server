import { createUser, findUserByEmail } from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";


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

export const loginUser = async (data) => {
    try {
        const { email, password } = data;
        const existingUser = await findUserByEmail(email)

        if (!existingUser) {
            throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        const token = generateToken(existingUser.id, existingUser.role)

        return {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
            token
        };
    } catch (error) {
        console.error(error)
        throw new Error(error.message)
    }
}