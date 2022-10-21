import Carts from '../models/tables/Carts';
import Products from '../models/tables/Products';
import ResponseUtil from '../utils/response.util';
import type { Cart } from '../models/dto/Carts.dto';


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


class CartService extends ResponseUtil {

    // add CartService property "include"
    include = [
        { 
            model: Products, 
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: Shops,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                }
            ]
        },
        { 
            model: Users, 
            attribute: { exclude: ["createdAt", "updatedAt"] } 
        }
    ];

    //add Product to cart
    async addToCart({product_id, user_id}: Cart) {
        try {
            
            const include = [ { model: Shops } ]
            const query = { where: { id: product_id }, include};
            const findProduct = await Products.findOne(query);
            const count = await Products.count(query);


            //Check if the product is existing and the product is active
            if (count && findProduct?.is_active) {
                
                //Check if shop is activated else 
                if(findProduct?.shopDetails?.is_active){
                    
                    //check if user has morethan 5 cart item for one shop
                    const query = { where: {user_id: user_id, shop_id: findProduct?.shopDetails.id, is_active: true} };
                    const count = await Carts.count(query)
                    if( count < 5 ){

                        //add to cart
                        const cartData = { 
                            product_id: findProduct?.id,
                            shop_id: findProduct?.shop_id,
                            user_id: user_id,
                            is_active: true
                         }
        
                         const create = await Carts.create(cartData);
        
                         return create 
                                    ? this.RESPONSE(CREATED, create, 1, "Add to cart success")
                                    : this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE)

                    } else {
                        return this.RESPONSE(BADREQUEST, {}, 0, "User can only add 1 to 5 items per shop!")
                    }

                }else{
                   return this.RESPONSE(BADREQUEST, {}, 0, SHOP_NOT_EXISTED);
                }

            } else {
                return this.RESPONSE(NOTFOUND, {}, 0, PRODUCT_DOES_NOT_EXIST)
            }

        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }


    async modifyCartActivation (cartId: Cart["id"]) {
        try {

            const query = { where: { id: cartId } };
            const findOneShop = await Carts.findOne(query);
            const count = await Carts.count(query);

            if(count){

                const update = await Carts.update({ is_active: !findOneShop?.is_active }, query);
                return update
                    ? this.RESPONSE(UPDATE, update, 1, UPDATE_MESSAGE)
                    : this.RESPONSE(BADREQUEST, update, 0, BADREQUEST_MESSAGE)

            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, CART_DOES_NOT_EXIST)
            }


        } catch (error: any) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }
    }


    //get all carts
    async getAllCarts () {
        try {

            const query = { include: this.include }
            const findAllCarts = await Carts.findAll(query);
            const count = await Carts.count();

            return count
                ? this.RESPONSE(OK, findAllCarts, count, OK_MESSAGE)
                : this.RESPONSE(BADREQUEST, [], 0, NO_RECORD_FOUND);

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }
    }

    //get one cart by id
    async getOneCartByID (cartId: Cart["id"] = 0) {
        try {

            const query = { where: { id: cartId }, include: this.include };
            const findOneShop = await Carts.findOne(query);
            const count = await Carts.count(query);

            return count
                ? this.RESPONSE(OK, findOneShop, count, OK_MESSAGE)
                : this.RESPONSE(BADREQUEST, {}, count, CART_DOES_NOT_EXIST);

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, INTERNAL_SERVER_ERROR_MESSAGE)
        }
    }

        //get one cart by id
        async getAllCartsByUserId (userId: Cart["user_id"] = 0) {
            try {
    
                const query = { where: { user_id: userId, is_active: true }, include: this.include };
                const findAll = await Carts.findAll(query);
                const count = await Carts.count(query);


                //filter Cart product with Shop
                const filterCartItemWithActiveShop = findAll.filter(cart=>{
                    if(cart.productDetails?.is_active){
                       return cart.productDetails.shopDetails?.is_active
                    }else{
                        return false
                    }
                });

                console.log("\n\n\n filteredCart:::",filterCartItemWithActiveShop, "\n\n\n");

                
    
                return count
                    ? this.RESPONSE(OK, filterCartItemWithActiveShop, filterCartItemWithActiveShop.length, OK_MESSAGE)
                    : this.RESPONSE(OK, [], count, "EMPTY CART YET");
    
            } catch (error: any) {
                    return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
            }
        }

 
}

export default new CartService;