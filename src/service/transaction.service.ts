import { ErrorMessages } from "../utils/messages/errorMessage";
import { SuccessMessage } from "../utils/messages/successMessage";
import Transaction, { TransactionStatus } from "../model/transaction.model";
import { transactionDTO } from "../validators/transaction.schema";
import { ApiError } from "../utils/ApiError";
import { HttpStatusCode } from "../utils/HttpStatusCode";

export class TransactionService {
  async getAllTransactions() {
    const result = await Transaction.find();
    return result;
  }

  async getTransactionById(transactionId: string) {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction)
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        ErrorMessages.TRANSACTION_NOT_FOUND,
      );
    return transaction;
  }

  async createTransaction(data: transactionDTO) {
    const createdTransaction = await Transaction.create(data);
    if (!createdTransaction)
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        ErrorMessages.TRANSACTION_FAILED,
      );
    return SuccessMessage.TRANSACTION_CREATED;
  }

  async updatePaymentStatus(transactionId: string) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { status: TransactionStatus.COMPLETED },
      { new: true },
    );

    if (!updatedTransaction) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        ErrorMessages.TRANSACTION_NOT_FOUND,
      );
    }

    return updatedTransaction;
  }
}
