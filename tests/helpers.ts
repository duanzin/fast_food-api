import { db } from "../src/config/database";

export async function cleanDB() {
  await db.query(`TRUNCATE TABLE products RESTART IDENTITY CASCADE`);
  await db.query(`TRUNCATE TABLE meals RESTART IDENTITY CASCADE`);
}
