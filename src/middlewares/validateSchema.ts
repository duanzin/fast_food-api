import { badRequestError, validationError } from "errors";
import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export function validateSchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) throw badRequestError();
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      throw validationError(error.details);
    } else {
      next();
    }
  };
}
