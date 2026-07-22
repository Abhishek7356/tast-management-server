import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express()

app.use(cors())
app.use(express.json())

app.get("/health", (req, res) => {
    res.json({ message: "Task manager heath is ok" })
})


app.use("/api/auth", authRoutes)
app.use("/api/task", taskRoutes)

export default app