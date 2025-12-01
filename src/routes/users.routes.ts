import express from "express";
import {
  createUserController,
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
} from "../controller/users.controller";

const router = express.Router();

router.post("/users", createUserController);
router.get("/users", getUsersController);
router.get("/user/:id", getUserController);
router.put("/user/:id", updateUserController);
router.delete("/user/:id", deleteUserController);

export default router;
