import { ErrorMessages } from "../utils/messages/errorMessage";
import { SuccessMessage } from "../utils/messages/successMessage";
import Transaction, { ITransaction } from "../model/transaction.model";

export class TransactionService {
  async getAllTransactions() {
    const result = await Transaction.find();
    return result;
  }

  async getTransactionById(transactionId: string) {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) throw new Error(ErrorMessages.TRANSACTION_FAILED);
    return transaction;
  }

  async createTransaction(data: ITransaction) {
    const createdTransaction = await Transaction.create(data);
    if (!createdTransaction) throw new Error(ErrorMessages.TRANSACTION_FAILED);
    return SuccessMessage.TRANSACTION_CREATED;
  }
}
