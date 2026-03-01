import { NextFunction, Request, Response } from "express";
import { TransactionService } from "../service/transaction.service";
import { HttpStatusCode } from "../utils/HttpStatusCode";

const transactionSchema = new TransactionService();

export const getAllTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await transactionSchema.getAllTransactions();
    return res.status(HttpStatusCode.OK).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
