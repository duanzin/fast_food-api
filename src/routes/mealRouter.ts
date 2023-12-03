import { Router } from "express";
import mealController from "../controllers/mealController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { mealSchema } from "../schemas/mealSchema.js";

const mealRouter = Router();

mealRouter.get("/", mealController.getAll);
mealRouter.post("/", validateSchema(mealSchema), mealController.create);
mealRouter.patch("/:id", mealController.update);
mealRouter.delete("/:id", mealController.remove);

export default mealRouter;
