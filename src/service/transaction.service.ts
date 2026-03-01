import { ErrorMessages } from "../utils/messages/errorMessage";
import { SuccessMessage } from "../utils/messages/successMessage";
import Transaction from "../model/transaction.model";
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
        HttpStatusCode.BAD_REQUEST,
        ErrorMessages.TRANSACTION_FAILED,
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
}
