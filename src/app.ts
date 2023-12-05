import { db } from "./config/database";
import express from "express";
import cors from "cors";
import mealRouter from "./routes/mealRouter";
import { handleApplicationErrors } from "./middlewares/errorHandlingMiddleware";

async function createTable() {
  await db.query(
    `BEGIN;
    
    CREATE TABLE IF NOT EXISTS meals (
      id SERIAL PRIMARY KEY,
      customer TEXT NOT NULL,
      observation TEXT,
      status BOOLEAN DEFAULT false
    );
    
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      meal_id INTEGER NOT NULL REFERENCES meals (id)
    );
    
    COMMIT;`
  );
}

createTable();

const app = express();
app
  .use(cors())
  .use(express.json())
  .use(mealRouter)
  .use(handleApplicationErrors);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));

export default app;
