import { openDb } from "../config/database.js";
import { CreateMealParams, MealParams } from "../protocols/mealProtocol.js";

async function createMeal(order: CreateMealParams) {
  openDb().then((db) => {
    db.run(`INSERT INTO meal (product, quantity, customer) VALUES (?,?,?)`, [
      order.product,
      order.quantity,
      order.customer,
    ]);
  });
}

async function updateMeal(id: number) {
  openDb().then((db) => {
    db.run(`UPDATE meal SET status=? WHERE id=?`, true, id);
  });
}

async function removeMeal(id: number) {
  return openDb().then((db) => {
    return db.run(`DELETE FROM meal WHERE status=?`, [id]);
  });
}

async function getAll() {
  return openDb().then((db) => {
    return db.all<MealParams[]>(`SELECT * FROM meal`);
  });
}

export default {
  createMeal,
  removeMeal,
  updateMeal,
  getAll,
};
