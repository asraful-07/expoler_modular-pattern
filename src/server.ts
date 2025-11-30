import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import path from "path";

const app = express();
app.use(express.json());
dotenv.config({ path: path.join(process.cwd(), ".env") });
const PORT = process.env.PORT;

//TODO database setup
const pool = new Pool({
  connectionString: `${process.env.DATABASE_URL}`,
});

const intoDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      address TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
            CREATE TABLE IF NOT EXISTS todos(
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(200) NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT false,
            due_date DATE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `);
};

intoDB();

//* POST users
app.post("/users", async (req: Request, res: Response) => {
  const { name, email, address } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO users (name, email, address)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [name, email, address]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: "Data insert done",
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//* GET users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await pool.query("SELECT * FROM users");

    res.status(200).json({
      success: true,
      data: users.rows,
      message: "Users data fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//* GET single users
app.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }
    //? [req.params.id]
    const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

    if (!user.rows.length) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//* PUT users update
app.put("/user/:id", async (req: Request, res: Response) => {
  const { name, email, address } = req.body;
  try {
    const user = await pool.query(
      `UPDATE users 
       SET name=$1, email=$2, address=$3 
       WHERE id=$4 
       RETURNING *`,
      [name, email, address, req.params.id]
    );

    if (!user.rows.length) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//* DELETE users delete
app.delete("/user/:id", async (req: Request, res: Response) => {
  try {
    const user = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [req.params.id]
    );

    if (!user.rows.length) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
