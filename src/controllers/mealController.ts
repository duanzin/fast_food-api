import { NextFunction, Request, Response } from "express";
import mealRepository from "../repositories/mealRepository";
import { MealParams } from "../protocols/mealProtocol";

async function create(req: Request, res: Response, next: NextFunction) {
  const newMeal: MealParams = req.body;
  try {
    await mealRepository.createMeal(newMeal);
    const meals = await mealRepository.getAll();
    res.status(201).send(meals);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  const id: number = parseInt(req.params.id);
  try {
    await mealRepository.updateMeal(id);
    const meals = await mealRepository.getAll();
    res.status(200).send(meals);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  const id: number = parseInt(req.params.id);
  try {
    await mealRepository.removeMeal(id);
    const meals = await mealRepository.getAll();
    res.status(200).send(meals);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export default {
  create,
  update,
  remove,
};
