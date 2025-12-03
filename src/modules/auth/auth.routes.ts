import express from "express";
import { CreateUser } from "./auth.controller";

const router = express.Router();

router.post("/login", CreateUser);

export default router;
