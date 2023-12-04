import { openDb } from "./config/database.js";
import express from "express";
import cors from "cors";
import mealRouter from "./routes/mealRouter.js";

async function createTable() {
  openDb().then((db) => {
    db.exec(
      `
      CREATE TABLE IF NOT EXISTS meals (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        customer TEXT NOT NULL,
        observation TEXT,
        status BOOLEAN DEFAULT false
      );
      
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        quantity TEXT NOT NULL,
        meal_id INTEGER NOT NULL,
        FOREIGN KEY (meal_id) REFERENCES meals (id)
      );
      `
    );
  });
}

openDb();
createTable();

const app = express();
app.use(cors()).use(express.json()).use(mealRouter);

const port = 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));
