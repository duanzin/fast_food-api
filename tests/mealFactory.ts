import { db } from "../src/config/database";
import { faker } from "@faker-js/faker";
import mealRepository from "../src/repositories/mealRepository";
import { ReceiveMealParams } from "../src/protocols/mealProtocol";

export async function createMealforTest(): Promise<ReceiveMealParams> {
  await mealRepository.createMeal({
    customer: faker.person.firstName(),
    observation: faker.lorem.paragraph(),
    products: [
      { name: faker.lorem.word(), quantity: faker.number.int({ max: 99 }) },
    ],
  });

  return await getLatestMeal();
}

async function getLatestMeal(): Promise<ReceiveMealParams | null> {
  const queryResult = await db.query(
    `
    SELECT DISTINCT ON (meals.id)
      meals.id AS mealId, customer, observation, status, products.id AS productId, name, quantity
    FROM meals
    LEFT JOIN products ON meals.id = products.meal_id
    ORDER BY meals.id DESC
  `
  );

  if (queryResult.rows.length === 0) {
    return null;
  }

  const row = queryResult.rows[0];

  const latestMeal: ReceiveMealParams = {
    id: row.mealid,
    customer: row.customer,
    observation: row.observation,
    status: row.status,
    products: [],
  };

  if (row.productid !== null) {
    latestMeal.products.push({
      name: row.name,
      quantity: row.quantity,
    });
  }

  return latestMeal;
}
