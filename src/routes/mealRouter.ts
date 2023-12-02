import { Router } from "express";
import mealController from "../controllers/mealController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { mealSchema } from "../schemas/mealSchema.js";

const mealRouter = Router();

mealRouter.post("/", validateSchema(mealSchema), mealController.create);
mealRouter.patch("/update/:id", mealController.update);
mealRouter.delete("/remove/:id", mealController.remove);

export default mealRouter;
