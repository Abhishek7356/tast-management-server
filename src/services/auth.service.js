import { createUser, findUserByEmail } from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import AppError from "../utils/AppError.js";

export const AuthService = {}

AuthService.registeUser = async (data) => {
    const { name, email, password } = data;
    const existingUser = await findUserByEmail(email)

    if (existingUser) {
        throw new AppError("Email already exist", 409);
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

AuthService.loginUser = async (data) => {
    const { email, password } = data;
    const existingUser = await findUserByEmail(email)

    if (!existingUser) {
        throw new AppError("Invalid email or password", 401);
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
        throw new AppError("Invalid email or password", 401);
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