import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;

  console.error("Error caught in middleware:", err.message);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};
