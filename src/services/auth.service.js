import { createUser, findUserByEmail } from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";


export const registeUser = async (data) => {
    const { name, email, password } = data;
    const existingUser = await findUserByEmail(email)

    if (existingUser) {
        throw new Error("Email already exist");
    }
    const role = "user"
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await createUser({ name, email, password: hashedPassword, role: role })


    return {
        id: userId,
        name,
        email,
        role
    };
}

export const loginUser = async (data) => {
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
}