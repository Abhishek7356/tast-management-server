import { AuthService } from "../services/auth.service.js";


export const register = async (req, res) => {
    try {
        const result = await AuthService.registeUser(req.body)

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: result
        });

    } catch (error) {
        const status =
            error.message === "Email already exists" ? 409 : 500;

        res.status(status).json({
            success: false,
            message: error.message,
        });
    }
}

export const login = async (req, res) => {
    try {
        const result = await AuthService.loginUser(req.body)

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: result
        });

    } catch (error) {
        const status =
            error.message === "Invalid email or password" ? 401 : 500;

        res.status(status).json({
            success: false,
            message: error.message,
        });
    }
}