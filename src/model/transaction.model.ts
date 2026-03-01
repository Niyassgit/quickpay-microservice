import mongoose, { Schema, Document } from "mongoose";

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}
export interface ITransaction extends Document {
  amount: number;
  currency: string;
  recipient: string;
  status: TransactionStatus;
}

const transactionSchema = new Schema<ITransaction>({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(TransactionStatus),
    default: TransactionStatus.PENDING,
  },
});

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema,
);

export default Transaction;
