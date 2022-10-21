import Products from '../models/tables/Products';

import ResponseUtil from '../utils/response.util';
import { Shop } from "../models/dto/Shops.dto";


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
    SHOP_NOT_EXISTED
} from '../utils/message.util';
import e from "express";
import type { Product } from '../models/dto/Products.dto';
import Shops from '../models/tables/Shops';


class ProductService extends ResponseUtil {

    include = [
        {model: Shops, attributes: { exclude: ["createdAt", "updatedAt"] } }
    ];

   async addProduct (dto: Product) {
        try {
                const create = await Products.create({
                    name: dto.name,
                    price: dto.price,
                    shop_id: dto.shop_id,
                    is_active: true
                });

                return create
                    ? this.RESPONSE(CREATED, create, 1, CREATED_MESSAGE)
                    : this.RESPONSE(BADREQUEST, create, 0, BADREQUEST_MESSAGE)

        } catch (error: any) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }
   }

   async updateProduct (dto: Shop) {
        try {

            const query = { where: { id: dto.id } };
            const findOne = await Products.findOne(query);
            const count = await Products.count(query);

            if(count){

                const update = await Products.update(dto, query);
                return update
                    ? this.RESPONSE(UPDATE, update, 1, UPDATE_MESSAGE)
                    : this.RESPONSE(BADREQUEST, update, 0, BADREQUEST_MESSAGE)

            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, SHOP_NOT_EXISTED)
            }


        } catch (error: any) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }
    }


    async modifyProductActivation (productId: Product["id"]) {
        try {

            const query = { where: { id: productId } };
            const findOneShop = await Products.findOne(query);
            const count = await Products.count(query);

            if(count){

                const update = await Products.update({ is_active: !findOneShop?.is_active }, query);
                return update
                    ? this.RESPONSE(UPDATE, update, 1, UPDATE_MESSAGE)
                    : this.RESPONSE(BADREQUEST, update, 0, BADREQUEST_MESSAGE)

            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, SHOP_NOT_EXISTED)
            }


        } catch (error: any) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }
    }


    //get all products
    async getAllProducts () {
        try {

            const query = { include: this.include }
            const findAllProduct = await Products.findAll(query);
            const count = await Products.count();


            //filter product with active Shop
            const filterActiveShopProducts = findAllProduct.filter(product=>{
                return product.shopDetails?.is_active;
            })

            return count
                ? this.RESPONSE(OK, filterActiveShopProducts, count, OK_MESSAGE)
                : this.RESPONSE(BADREQUEST, [], 0, NO_RECORD_FOUND);

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }
    }

    //get one products by id
    async getOneProductByID (productId: Product["id"] = 0) {
        try {

            const query = { 
                where: { id: productId },
                include: this.include }
            const findOneShop = await Products.findOne(query);
            const count = await Products.count(query);

            return count
                ? this.RESPONSE(OK, findOneShop, count, OK_MESSAGE)
                : this.RESPONSE(BADREQUEST, {}, count, SHOP_NOT_EXISTED);

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

}

export default new ProductService;