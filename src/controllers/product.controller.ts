import { Product } from "../models/dto/Products.dto";
import ProductService from "../services/product.service";

class ProductController{

    async addProduct (dto: Product) {
        const response = await ProductService.addProduct(dto);
        return response;
    }

    async updateProduct (dto: Product) {
        const response = await ProductService.updateProduct(dto);
        return response;
    }

    async modifyProductActivation (dto: Product["id"]) {
        const response = await ProductService.modifyProductActivation(dto);
        return response;
    }

    async getAllProducts () {
        const response = await ProductService.getAllProducts();
        return response;
    }

    async getOneProductByID (productId: Product["id"]) {
        const response = await ProductService.getOneProductByID(productId);
        return response;
    }

}

export default new ProductController;