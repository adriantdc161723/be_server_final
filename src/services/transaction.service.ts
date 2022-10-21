import Carts from '../models/tables/Carts';
import Products from '../models/tables/Products';
import ResponseUtil from '../utils/response.util';
import type { Transactions as TransactionType } from '../models/dto/Transactions.dto';
import Transactions from '../models/tables/Transactions';


//response constants and messages
import {
    OK, 
    NOTFOUND, 
    BADREQUEST, 
    CREATED, 
    UPDATE, 
    INTERNAL_SERVER_ERROR
} from '../utils/constants.util';

import {
    OK_MESSAGE, 
    NOTFOUND_MESSAGE, 
    BADREQUEST_MESSAGE, 
    CREATED_MESSAGE, 
    UPDATE_MESSAGE, 
    INTERNAL_SERVER_ERROR_MESSAGE,
    USER_DOES_NOT_EXIST,
    NO_RECORD_FOUND,
    SHOP_NAME_ALREADY_EXISTED,
    SHOP_NOT_EXISTED,
    PRODUCT_DOES_NOT_EXIST,
    CART_DOES_NOT_EXIST
} from '../utils/message.util';
import e from "express";
import Shops from '../models/tables/Shops';
import Users from '../models/tables/Users';


class TransactionService extends ResponseUtil {

    async checkOut ({user_id, shop_id}: TransactionType) {
        try {
            
            const include = [ { model: Products } ]

            //check if there is existing user cart
            const query = { where: { user_id, shop_id }, include };
            const findUserCart = await Carts.findAll(query);
            const count = await Carts.count(query);

            if(count){

                //check if the said shop is activated
                const findShop = await Shops.findOne({ where: { id: shop_id } });

                if(findShop && findShop.is_active){

                    // CREATE TRANSACTION
                    //sum price alternative for Sequelize SUM
                    let totalPrice = 0;

                    findUserCart.forEach( cart => {
                        let price: any = cart.productDetails?.price ? cart.productDetails?.price : "0.00";
                        totalPrice = totalPrice + parseFloat(price);
                    });
                    
                    const transaction = {
                        user_id: user_id,
                        shop_id: shop_id,
                        transactionStatus: "Ongoing",
                        totalPrice: totalPrice,
                        is_active: true
                    }

                    const createTransaction = await Transactions.create(transaction);

                    return createTransaction 
                        ? this.RESPONSE(OK, createTransaction, count, OK_MESSAGE)
                        : this.RESPONSE(BADREQUEST, {}, 0, "Cannot create transaction!");


                }else{
                   return this.RESPONSE(BADREQUEST, {}, 0, "Transaction Cannot be created, The shop is deactivated or not existing");
                }


                    
            }else{
                return this.RESPONSE(BADREQUEST, {}, 0, "No Cart items found, Transaction cannot be created!");
            }

        } catch (error: any) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message);
        }
    }

    async getAllTransactions () {
        try {
            
            const findAllTrans = await Transactions.findAll();
            const count = await Transactions.count();

            return count
                ? this.RESPONSE(OK, findAllTrans, count, OK_MESSAGE)
                : this.RESPONSE(BADREQUEST, {}, 0, NO_RECORD_FOUND);
          
        } catch (error: any) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message);
        }
    }

    async getOneTransactionsById (transId: TransactionType['id']) {
        try {
            
            const query = { where: { id: transId } };
            const findOneTrans = await Transactions.findOne(query);

            return findOneTrans
                ? this.RESPONSE(OK, findOneTrans, 1, OK_MESSAGE)
                : this.RESPONSE(BADREQUEST, {}, 0, NO_RECORD_FOUND);
          
        } catch (error: any) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message);
        }
    }


    //update transaction
    async updateTransaction (dto: TransactionType) {

        try {
            const query = { where: { id: dto.id } };
            const find = await  Transactions.findOne(query);

            if(find){
                            
                const update: TransactionType = dto;
                const updateTransaction = await Transactions.update(update, { where: { id: dto.id } } );
                
                return updateTransaction
                    ? this.RESPONSE(UPDATE, updateTransaction, 1, UPDATE_MESSAGE)
                    : this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE);
            } else {
               return this.RESPONSE(BADREQUEST, {}, 0, NO_RECORD_FOUND);
            }
          
        } catch (error: any) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message);
        }

    }
 
}

export default new TransactionService;