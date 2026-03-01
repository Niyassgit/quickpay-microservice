import { NextFunction, Request, Response } from "express";
import { TransactionService } from "../service/transaction.service";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import { transactionDTO } from "../validators/transaction.schema";

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

export const getTransactionById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const result = await transactionSchema.getTransactionById(id);
    return res.status(HttpStatusCode.OK).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body as transactionDTO;
    const result = await transactionSchema.createTransaction(body);
    return res
      .status(HttpStatusCode.CREATED)
      .json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
