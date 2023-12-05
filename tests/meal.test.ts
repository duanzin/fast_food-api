import { faker } from "@faker-js/faker";
import supertest from "supertest";
import { createMealforTest } from "./mealFactory";
import { cleanDB } from "./helpers";
import app from "../src/app";
import httpStatus from "http-status";

beforeAll(async () => {
  await cleanDB();
});

const server = supertest(app);

describe("POST /", () => {
  it("should respond with status 422 when body is not given", async () => {
    const response = await server.post("/");

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/").send(invalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      customer: faker.person.firstName(),
      observation: faker.lorem.paragraph(),
      products: [
        { name: faker.lorem.word(), quantity: faker.number.int({ max: 99 }) },
      ],
    });

    it("should respond with status 201", async () => {
      const body = generateValidBody();

      const response = await server.post("/").send(body);

      expect(response.status).toBe(httpStatus.CREATED);
    });
  });
});

describe("GET /", () => {
  it("should respond with status 200 and empty array when theres nothing", async () => {
    await cleanDB();
    const response = await server.get("/");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([]);
  });

  it("should respond with status 200 and array of objects when there are elements in the database", async () => {
    await createMealforTest();

    const response = await server.get("/");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([
      {
        customer: expect.any(String),
        id: expect.any(Number),
        observation: expect.any(String),
        products: [
          {
            name: expect.any(String),
            quantity: expect.any(Number),
          },
        ],
        status: false,
      },
    ]);
  });
});

describe("PATCH /:id", () => {
  it("should respond with status 400 when id is not a number", async () => {
    const response = await server.patch("/aaa");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 404 when theres no element with given id", async () => {
    const response = await server.patch("/99999999");

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 and array of objects when theres an element with given id", async () => {
    const testMeal = await createMealforTest();

    const response = await server.patch(`/${testMeal.id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          customer: expect.any(String),
          observation: expect.any(String),
          status: expect.any(Boolean),
          products: [
            {
              name: expect.any(String),
              quantity: expect.any(Number),
            },
          ],
        }),
      ])
    );
  });
});

describe("DELETE /:id", () => {
  it("should respond with status 400 when id is not a number", async () => {
    const response = await server.delete("/aaa");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 404 when theres no element with given id", async () => {
    const response = await server.delete("/99999999");

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 and array of objects when theres an element with given id", async () => {
    const testMeal = await createMealforTest();

    const response = await server.delete(`/${testMeal.id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          customer: expect.any(String),
          observation: expect.any(String),
          status: expect.any(Boolean),
          products: [
            {
              name: expect.any(String),
              quantity: expect.any(Number),
            },
          ],
        }),
      ])
    );
  });
});
