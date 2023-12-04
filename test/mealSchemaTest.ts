import { faker } from "@faker-js/faker";
import { mealSchema } from "../src/schemas/mealSchema.js";

describe("mealSchema", () => {
  const generateValidInput = () => ({
    customer: faker.person.firstName(),
    observation: faker.lorem.paragraph(),
    products: [{ name: faker.lorem.word(), quantity: faker.number.int() }],
  });

  describe("when customer is not valid", () => {
    it("should return error if email is not present", () => {
      const input = generateValidInput();
      delete input.customer;

      const { error } = mealSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if customer is not string", () => {
      const input = generateValidInput();
      input.customer = faker.number.int() as any;

      const { error } = mealSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when observation is not valid", () => {
    it("should return error if observation is present but null", () => {
      const input = generateValidInput();
      input.observation = null as any;

      const { error } = mealSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if observation is not a string", () => {
      const input = generateValidInput();
      input.observation = faker.number.int() as any;

      const { error } = mealSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when products is not valid", () => {
    it("should return error if products is not present", () => {
      const input = generateValidInput();
      delete input.products;

      const { error } = mealSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if products is not an array", () => {
      const input = generateValidInput();
      input.products = faker.number.int() as any;

      const { error } = mealSchema.validate(input);

      expect(error).toBeDefined();
    });

    describe("when name is not valid", () => {
      it("should return error if name is not present", () => {
        const input = generateValidInput();
        delete input.products[0].name;

        const { error } = mealSchema.validate(input);

        expect(error).toBeDefined();
      });

      it("should return error if name is not string", () => {
        const input = generateValidInput();
        input.products[0].name = faker.number.int() as any;

        const { error } = mealSchema.validate(input);

        expect(error).toBeDefined();
      });
    });

    describe("when quantity is not valid", () => {
      it("should return error if quantity is not present", () => {
        const input = generateValidInput();
        delete input.products[0].quantity;

        const { error } = mealSchema.validate(input);

        expect(error).toBeDefined();
      });

      it("should return error if quantity is not a number", () => {
        const input = generateValidInput();
        input.products[0].quantity = faker.lorem.word() as any;

        const { error } = mealSchema.validate(input);

        expect(error).toBeDefined();
      });
    });
  });

  it("should return no error if input is valid", () => {
    const input = generateValidInput();

    const { error } = mealSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
