import type { Cart } from "../models/dto/Carts.dto";
import CartService from "../services/cart.service";


class CartController{
    async addToCart({product_id, user_id}: Cart) {
        const response = await CartService.addToCart({product_id, user_id});
        return response;
    }

    async getAllCarts() {
        const response = await CartService.getAllCarts();
        return response;
    }

    async getOneCartById(cartId: Cart['id']) {
        const response = await CartService.getOneCartByID(cartId);
        return response;
    }

    async modifyCartActivation(cartId: Cart['id']) {
        const response = await CartService.modifyCartActivation(cartId);
        return response;
    }

    async getAllCartsByUserId(userId: Cart['user_id']) {
        const response = await CartService.getAllCartsByUserId(userId);
        return response;
    }

}

export default new CartController;