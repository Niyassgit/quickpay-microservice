import express from "express";
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateStatus,
} from "../controller/transactions.controller";
import validate from "../middleware/validate.middleware";
import { transactionValidationSchema } from "../validators/transaction.schema";
const router = express.Router();

router.get("/", getAllTransactions);
router.get("/:id", getTransactionById);
router.post("/", validate(transactionValidationSchema), createTransaction);
router.patch("/:id/process", updateStatus);

export default router;
