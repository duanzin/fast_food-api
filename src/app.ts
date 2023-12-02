import { openDb } from "./config/database.js";
import express from "express";
import cors from "cors";
import mealRouter from "./routes/mealRouter.js";

async function createTable() {
  openDb().then((db) => {
    db.exec(
      `CREATE TABLE IF NOT EXISTS meal (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
              product VARCHAR NOT NULL, 
              quantity INT NOT NULL,
              customer VARCHAR NOT NULL,
              status BOOLEAN NOT NULL DEFAULT false)`
    );
  });
}

openDb();
createTable();

const app = express();
app.use(cors()).use(express.json()).use(mealRouter);
