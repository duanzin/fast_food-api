import { NextFunction, Request, Response } from "express";
import mealRepository from "../repositories/mealRepository";
import { CreateMealParams } from "../protocols/mealProtocol";
import httpStatus from "http-status";
import { badRequestError } from "../errors/index";

async function create(req: Request, res: Response, next: NextFunction) {
  const newMeal: CreateMealParams = req.body;
  try {
    await mealRepository.createMeal(newMeal);
    res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    return next(err);
  }
}

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const meals = await mealRepository.getAll();
    res.status(httpStatus.OK).send(meals);
  } catch (err) {
    return next(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  const id: number = parseInt(req.params.id);
  try {
    if (isNaN(parseInt(req.params.id))) throw badRequestError();
    await mealRepository.updateMeal(id);
    const meals = await mealRepository.getAll();
    res.status(httpStatus.OK).send(meals);
  } catch (err) {
    return next(err);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  const id: number = parseInt(req.params.id);
  try {
    if (isNaN(parseInt(req.params.id))) throw badRequestError();
    await mealRepository.removeMeal(id);
    const meals = await mealRepository.getAll();
    res.status(httpStatus.OK).send(meals);
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
