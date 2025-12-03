import express from "express";
import userRoutes from "./modules/users/users.routes";
import todoRoutes from "./modules/todos/todo.routes";
import authRoutes from "./modules/auth/auth.routes";
import config from "./config";
import initDB from "./config/db";

const app = express();
app.use(express.json());

const PORT = config.port;

initDB();

//* Routes
app.use("/api", userRoutes);
app.use("/api", todoRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//* res.status(401).json({ message: "Invalid credentials" }); (data match)
//* res.status(400).json({ message: "Email and password required" }); (must do)
//* res.status(409).json({ message: "User already exists" }); (all ready exists)
