import { openDb } from "../config/database.js";
import { CreateMealParams } from "../protocols/mealProtocol.js";

async function createMeal(order: CreateMealParams) {
  const db = await openDb();
  await db.run("INSERT INTO meals (customer) VALUES (?)", order.customer);
  const mealId = await getLatestMealId();

  await createProducts(order, mealId.id);
}

async function getLatestMealId() {
  return openDb().then((db) => {
    return db.get("SELECT id FROM meals ORDER BY id DESC LIMIT 1");
  });
}

async function createProducts(order: CreateMealParams, mealId: number) {
  openDb().then((db) => {
    for (const product of order.products) {
      db.run(
        "INSERT INTO products (name, quantity, meal_id) VALUES (?, ?, ?)",
        [product.name, product.quantity, mealId]
      );
    }
  });
}

async function updateMeal(id: number) {
  openDb().then((db) => {
    db.run(`UPDATE meals SET status=? WHERE id=?`, true, id);
  });
}

async function removeMeal(id: number) {
  const db = await openDb();

  await db.run(`DELETE FROM products WHERE meal_id=?`, [id]);
  await db.run(`DELETE FROM meals WHERE id=?`, [id]);
  await db.close();
}

async function getAll() {
  return openDb().then((db) => {
    return db
      .all(
        `
      SELECT meals.id AS mealId, customer, status, products.id AS productId, name, quantity
      FROM meals
      LEFT JOIN products ON meals.id = products.meal_id
    `
      )
      .then((rows) => {
        const mealsData = rows.reduce((acc, row) => {
          let currentMeal = acc.find((meal) => meal.id === row.mealId);

          if (!currentMeal) {
            currentMeal = {
              id: row.mealId,
              customer: row.customer,
              status: row.status,
              products: [],
            };
            acc.push(currentMeal);
          }

          if (row.productId !== null) {
            currentMeal.products.push({
              name: row.name,
              quantity: row.quantity,
            });
          }

          return acc;
        }, []);

        return mealsData;
      });
  });
}

export default {
  createMeal,
  removeMeal,
  updateMeal,
  getAll,
};
