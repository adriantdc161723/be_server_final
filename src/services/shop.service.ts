import Shops from '../models/tables/Shops';

import ResponseUtil from '../utils/response.util';
import { Shop } from "../models/dto/Shops.dto";
import * as bcrypt from 'bcrypt';


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
import Products from '../models/tables/Products';
import { Op } from 'sequelize';


class ShopService extends ResponseUtil {
    
    include = [
        {
            model: Products,
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        }
    ];

   async createShop (dto: Shop) {
        try {

            const query = { where: { name: dto.name } };
            const findOne = await Shops.findOne(query);
            const count = await Shops.count(query);

            if(!count){

                const create = await Shops.create({
                    name: dto.name,
                    address: dto.address,
                    business_type: dto.business_type,
                    is_active: true
                });

                return create
                    ? this.RESPONSE(CREATED, create, 1, CREATED_MESSAGE)
                    : this.RESPONSE(BADREQUEST, create, 0, BADREQUEST_MESSAGE)

            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, SHOP_NAME_ALREADY_EXISTED)
            }


        } catch (error: any) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }
   }

   async updateShop (dto: Shop) {
        try {

            const query = { where: { id: dto.id } };
            const findOne = await Shops.findOne(query);
            const count = await Shops.count(query);

            if(count){

                const update = await Shops.update(dto, query);
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


    async modifyShopActivation (shopId: Shop["id"]) {
        try {

            const query = { where: { id: shopId } };
            const findOneShop = await Shops.findOne(query);
            const count = await Shops.count(query);

            if(count){

                const update = await Shops.update({ is_active: !findOneShop?.is_active }, query);
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


        //get all shops
        async getAllShop () {
            try {
                
                const query: any = {include: this.include }
                const findAllShops = await Shops.findAll(query);
                const count = await Shops.count();
    
                return count
                    ? this.RESPONSE(OK, findAllShops, count, OK_MESSAGE)
                    : this.RESPONSE(OK, [], 0, NO_RECORD_FOUND);
    
            } catch (error: any) {
                    return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
            }
        }
    
        //get one shop
        async getOneShopByID (shopId: Shop["id"] = 0) {
            try {
    
                const query: any = { 
                    where: { id: shopId},
                    include: this.include
                }
                const findOneShop = await Shops.findOne(query);
                const count = await Shops.count({where: { id: shopId}});
    
                return count
                    ? this.RESPONSE(OK, findOneShop, count, OK_MESSAGE)
                    : this.RESPONSE(BADREQUEST, {}, count, SHOP_NOT_EXISTED);
    
            } catch (error: any) {
                    return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
            }
        }

}

export default new ShopService;