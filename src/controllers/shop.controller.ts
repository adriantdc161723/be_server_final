import ShopService from "../services/shop.service";
import { Shop } from '../models/dto/Shops.dto';

class ShopController{

    async createShop (dto: Shop) {
        const response = await ShopService.createShop(dto);
        return response;
    }

    async updateShop (dto: Shop) {
        const response = await ShopService.updateShop(dto);
        return response;
    }

    async modifyShopActivation (dto: Shop["id"]) {
        const response = await ShopService.modifyShopActivation(dto);
        return response;
    }

    async getAllShop () {
        const response = await ShopService.getAllShop();
        return response;
    }

    async getOneShopByID (shopId: Shop["id"]) {
        const response = await ShopService.getOneShopByID(shopId);
        return response;
    }

}

export default new ShopController;