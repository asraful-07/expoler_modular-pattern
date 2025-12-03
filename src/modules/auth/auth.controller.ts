import { Request, Response } from "express";
import { LoginUser } from "./auth.service";

export const CreateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const newUser = await LoginUser(email, password);

  try {
    res
      .status(200)
      .json({ success: true, message: "Successfully login", data: newUser });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
