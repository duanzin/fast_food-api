import { openDb } from "../src/config/database.js";

export async function cleanDB() {
  const db = await openDb();

  await db.run(`DELETE FROM products`);
  await db.run(`DELETE FROM meals`);
  await db.close();
}
