import { registeUser } from "../services/auth.service.js";


export const register = async (req, res) => {
    try {
        const result = await registeUser(req.body)

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: result
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}