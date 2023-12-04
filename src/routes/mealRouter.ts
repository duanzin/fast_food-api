import { Router } from "express";
import mealController from "../controllers/mealController";
import { validateSchema } from "../middlewares/validateSchema";
import { mealSchema } from "../schemas/mealSchema";

const mealRouter = Router();

mealRouter.get("/", mealController.getAll);
mealRouter.post("/", validateSchema(mealSchema), mealController.create);
mealRouter.patch("/:id", mealController.update);
mealRouter.delete("/:id", mealController.remove);

export default mealRouter;
