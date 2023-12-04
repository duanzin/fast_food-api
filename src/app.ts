import { openDb } from "./config/database";
import express from "express";
import cors from "cors";
import mealRouter from "./routes/mealRouter";
import { handleApplicationErrors } from "./middlewares/errorHandlingMiddleware";

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
        quantity INTEGER NOT NULL,
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
app
  .use(cors())
  .use(express.json())
  .use(mealRouter)
  .use(handleApplicationErrors);

const port = 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));

export default app;
