import Joi from "joi";
import { CreateMealParams, Product } from "../protocols/mealProtocol.js";

export const mealSchema = Joi.object<CreateMealParams>({
  customer: Joi.string().required(),
  observation: Joi.string().optional(),
  products: Joi.array()
    .items(
      Joi.object<Product>({
        name: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
      })
    )
    .required(),
});
