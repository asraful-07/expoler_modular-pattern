import express from "express";
import {
  createUserController,
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
} from "./users.controller";
import auth from "../../middleware/auth";
import { logger } from "../../middleware/logger";

//* routes (path/map handle) -> controller (req and res handle) -> service (db and extra anther business login )

const router = express.Router();

router.post("/users", createUserController);
router.get("/users", logger, auth("admin"), getUsersController);
router.get("/user/:id", getUserController);
router.put("/user/:id", updateUserController);
router.delete("/user/:id", deleteUserController);

export default router;
