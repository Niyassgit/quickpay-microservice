import { z } from "zod";
import { TransactionStatus } from "../model/transaction.model";

export const transactionValidationSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),

  currency: z.string().min(1, "Currency is required"),

  recipient: z.string().min(1, "Recipient is required"),

  status: z
    .enum([TransactionStatus.PENDING, TransactionStatus.COMPLETED], {
      message: "Status must be either PENDING or COMPLETED",
    })
    .optional(),
});

export type transactionDTO = z.infer<typeof transactionValidationSchema>;
