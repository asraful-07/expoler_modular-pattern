import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import path from "path";

const app = express();
app.use(express.json());
dotenv.config({ path: path.join(process.cwd(), ".env") });

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

//* POST api
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
