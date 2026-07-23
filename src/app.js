import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())

app.get("/health", (req, res) => {
    res.json({ message: "Task manager heath is ok" })
})


app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

app.use((err, req, res, next) => {

    console.error(err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });

});

export default app