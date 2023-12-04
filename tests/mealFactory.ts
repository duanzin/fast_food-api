import { openDb } from "../src/config/database";
import { faker } from "@faker-js/faker";
import mealRepository from "../src/repositories/mealRepository";
import { ReceiveMealParams } from "../src/protocols/mealProtocol";

export async function createMealforTest(): Promise<ReceiveMealParams> {
  await mealRepository.createMeal({
    customer: faker.person.firstName(),
    observation: faker.lorem.paragraph(),
    products: [{ name: faker.lorem.word(), quantity: faker.number.int() }],
  });

  return await getLatestMeal();
}

async function getLatestMeal(): Promise<ReceiveMealParams> {
  return openDb().then((db) => {
    return db
      .get(
        `
      SELECT meals.id AS mealId, customer, observation, status, products.id AS productId, name, quantity
      FROM meals
      LEFT JOIN products ON meals.id = products.meal_id
      ORDER BY meals.id DESC
      LIMIT 1
    `
      )
      .then((row) => {
        const latestMeal = {
          id: row.mealId,
          customer: row.customer,
          observation: row.observation,
          status: row.status,
          products: [],
        };
        if (row.productId !== null) {
          latestMeal.products.push({
            name: row.name,
            quantity: row.quantity,
          });
        }

        return latestMeal;
      });
  });
}
