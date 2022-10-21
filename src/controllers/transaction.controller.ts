import type { Transactions } from '../models/dto/Transactions.dto';
import TransactionService from '../services/transaction.service';

class TransactionController{
    
    async checkOut ({user_id, shop_id}: Transactions) {
        const response = await TransactionService.checkOut({user_id, shop_id});
        return response;
    }

    async getAllTransactions () {
        const response = await TransactionService.getAllTransactions();
        return response;
    }

    async updateTransaction (dto: Transactions) {
        const response = await TransactionService.updateTransaction(dto);
        return response;
    }

    async getOneTransactionById (transId: Transactions['id']) {
        const response = await TransactionService.getOneTransactionsById(transId);
        return response;
    }

}

export default new TransactionController;