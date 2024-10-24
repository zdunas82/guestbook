import express from "express";
import cors from "cors";
import pg from "pg"; 
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config(); // Set up dotenv to load .env file

// Create the database pool 
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// Root route to verify the server is running
app.get("/", (request, response) => response.json("Root route."));

// GET route to fetch all messages from the database
app.get("/messages", async function (request, response) {
    const result = await db.query("SELECT * FROM messages");
    const messages = result.rows;
    response.json(messages);
});

// POST route to save a message in the database
app.post("/message", async function (request, response) {
  const username = request.body.username;
  const content = request.body.message;

  console.log("Received data:", username, content);

    const result = await db.query(
      "INSERT INTO messages (msg_name, content) VALUES ($1, $2) RETURNING *",
      [username, content]
    );
    response.json(result.rows[0]);
});

// Listen on port 8080
app.listen(8080, function() {
  console.log("App is running on port 8080");
});
