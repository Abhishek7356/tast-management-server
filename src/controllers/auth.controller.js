import { AuthService } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const register = asyncHandler(async (req, res) => {
    const result = await AuthService.registeUser(req.body)

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: result
    });
})

export const login = asyncHandler(async (req, res) => {
    const result = await AuthService.loginUser(req.body)

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: result
    });
})