import { notFoundError } from "../errors/index";
import { db } from "../config/database";
import { QueryResult } from "pg";
import { CreateMealParams, ReceiveMealParams } from "../protocols/mealProtocol";

async function createMeal(order: CreateMealParams) {
  const result: QueryResult<{ id: number }> = await db.query(
    "INSERT INTO meals (customer, observation) VALUES ($1, $2) RETURNING id",
    [order.customer, order.observation]
  );
  const mealId: number = result.rows[0].id;

  await createProducts(order, mealId);
}

async function createProducts(order: CreateMealParams, mealId: number) {
  for (const product of order.products) {
    await db.query(
      "INSERT INTO products (name, quantity, meal_id) VALUES ($1, $2, $3)",
      [product.name, product.quantity, mealId]
    );
  }
}

async function updateMeal(id: number) {
  const existingMealResult = await db.query(
    "SELECT * FROM meals WHERE id = $1",
    [id]
  );

  if (existingMealResult.rows.length === 0) {
    throw notFoundError();
  }

  await db.query("UPDATE meals SET status = $1 WHERE id = $2", [true, id]);
}

async function removeMeal(id: number) {
  const existingMealResult = await db.query(
    "SELECT * FROM meals WHERE id = $1",
    [id]
  );

  if (existingMealResult.rows.length === 0) {
    throw notFoundError();
  }

  await db.query("DELETE FROM products WHERE meal_id = $1", [id]);
  await db.query("DELETE FROM meals WHERE id = $1", [id]);
}

async function getAll(): Promise<ReceiveMealParams[]> {
  const result = await db.query(
    `
    SELECT meals.id AS mealId, customer, observation, status, products.id AS productId, name, quantity
    FROM meals
    LEFT JOIN products ON meals.id = products.meal_id
  `
  );

  const rows = result.rows;

  const mealsDataMap: Record<number, ReceiveMealParams> = {};

  rows.forEach((row) => {
    const mealId = row.mealid;
    const product =
      row.productId !== null
        ? { name: row.name, quantity: row.quantity }
        : null;

    if (!(mealId in mealsDataMap)) {
      mealsDataMap[mealId] = {
        id: mealId,
        customer: row.customer,
        observation: row.observation,
        status: row.status,
        products: product ? [product] : [],
      };
    } else {
      if (product) {
        mealsDataMap[mealId].products.push(product);
      }
    }
  });

  const mealsData = Object.values(mealsDataMap);

  return mealsData;
}

export default {
  createMeal,
  removeMeal,
  updateMeal,
  getAll,
};
