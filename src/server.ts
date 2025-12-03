import { app } from "./app";
import config from "./config";

const port = config.port;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//* res.status(400).json({ message: "Email and password required" }); (must do)
//* res.status(401).json({ message: "Invalid credentials" }); (data match)
//* res.status(403).json({ error: "Forbidden" }); (no data)
//* res.status(409).json({ message: "User already exists" }); (all ready exists)
