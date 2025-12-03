import { Request, Response } from "express";
import {
  createUserService,
  getUsersService,
  getUserService,
  updateUserService,
  deleteUserService,
} from "./users.service";

// Create user
export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);

    res.status(201).json({
      success: true,
      data: user,
      message: "User created successfully",
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all users
export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getUsersService();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get single user
export const getUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    const user = await getUserService(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update user
export const updateUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, email, address } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    const user = await updateUserService(id, name, email, address);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete user
export const deleteUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    const user = await deleteUserService(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
