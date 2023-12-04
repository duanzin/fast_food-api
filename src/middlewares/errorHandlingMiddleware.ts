import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

function sendErrorResponse(res: Response, status: number, message: string) {
  return res.status(status).json({ message });
}

export function handleApplicationErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === "BadRequestError") {
    return sendErrorResponse(res, httpStatus.BAD_REQUEST, err.message);
  }

  if (err.name === "ValidationError") {
    return sendErrorResponse(res, httpStatus.UNPROCESSABLE_ENTITY, err.message);
  }

  return sendErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, err.message);
}
