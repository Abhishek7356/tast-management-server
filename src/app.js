import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { authenticate } from "./middlewares/auth.middlewar.js";

const app = express()

app.use(cors())
app.use(express.json())

app.get("/health", (req, res) => {
    res.json({ message: "Task manager heath is ok" })
})

app.get("/protected", authenticate, (req, res) => {
    res.json({
        message: "You are authenticated",
        user: req.user
    });
});

app.use("/api/auth", authRoutes)

export default app