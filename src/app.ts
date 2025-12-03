import express from "express";
import userRoutes from "./modules/users/users.routes";
import todoRoutes from "./modules/todos/todo.routes";
import authRoutes from "./modules/auth/auth.routes";
import initDB from "./config/db";

export const app = express();
app.use(express.json());

//TODO init db
initDB();

//* Routes
app.use("/api", userRoutes);
app.use("/api", todoRoutes);
app.use("/api", authRoutes);
