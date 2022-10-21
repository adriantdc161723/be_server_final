type TransactionStatus = "Ongoing" | "Completed" | "Cancelled"; 

export interface Transactions{
    id?: number,
    user_id?: number,
    shop_id?: number,
    totalPrice?: number,
    transactionStatus?: TransactionStatus,
    is_active?: Boolean
}