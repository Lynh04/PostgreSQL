// src/server.js
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import schoolRouter from "./routes/school.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRouter);
app.use("/api", schoolRouter);

// Khởi động Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});