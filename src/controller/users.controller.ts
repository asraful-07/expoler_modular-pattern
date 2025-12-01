import { Request, Response } from "express";
import { pool } from "../server";

// Create user
export const createUserController = async (req: Request, res: Response) => {
  const { name, email, address } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, address) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, address]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: "User created successfully",
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all users
export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await pool.query(`SELECT * FROM users`);
    res.status(200).json({ success: true, data: users.rows });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get single user
export const getUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ success: false, message: "Invalid ID" });

  try {
    const user = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    if (!user.rows.length)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, data: user.rows[0] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update user
export const updateUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, email, address } = req.body;
  if (isNaN(id))
    return res.status(400).json({ success: false, message: "Invalid ID" });

  try {
    const user = await pool.query(
      `UPDATE users SET name=$1, email=$2, address=$3, updated_at=NOW() WHERE id=$4 RETURNING *`,
      [name, email, address, id]
    );
    if (!user.rows.length)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, data: user.rows[0] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete user
export const deleteUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ success: false, message: "Invalid ID" });

  try {
    const user = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [
      id,
    ]);
    if (!user.rows.length)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 //* middleware 
 * app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

// logger middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}\n`);
  next();
};

 */
