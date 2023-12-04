import { NextFunction, Request, Response } from "express";
import mealRepository from "../repositories/mealRepository.js";
import { CreateMealParams } from "../protocols/mealProtocol.js";

async function create(req: Request, res: Response, next: NextFunction) {
  const newMeal: CreateMealParams = req.body;
  try {
    await mealRepository.createMeal(newMeal);
    res.sendStatus(201);
  } catch (err) {
    return next(err);
  }
}

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const meals = await mealRepository.getAll();
    res.status(200).send(meals);
  } catch (err) {
    return next(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  const id: number = parseInt(req.params.id);
  try {
    await mealRepository.updateMeal(id);
    const meals = await mealRepository.getAll();
    res.status(200).send(meals);
  } catch (err) {
    return next(err);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  const id: number = parseInt(req.params.id);
  try {
    await mealRepository.removeMeal(id);
    const meals = await mealRepository.getAll();
    res.status(200).send(meals);
  } catch (err) {
    return next(err);
  }
}

export default {
  create,
  update,
  remove,
  getAll,
};
