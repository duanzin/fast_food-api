import Joi from "joi";
import { MealParams } from "../protocols/mealProtocol.js";

export const mealSchema = Joi.object<MealParams>({
  product: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  customer: Joi.string().required(),
});
