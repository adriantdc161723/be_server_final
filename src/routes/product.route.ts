import express, {Router, Request, Response} from 'express';
import ProductController from '../controllers/product.controller';
import authService from '../services/auth.service';

const ProductRouter: Router = express.Router();

ProductRouter.post('/add-product', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await ProductController.addProduct(req.body);
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});


ProductRouter.put('/update-product', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await ProductController.updateProduct(req.body);
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});


ProductRouter.put('/modify-product-activation/:id', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await ProductController.modifyProductActivation(parseInt(req.params.id));
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});

ProductRouter.get('/get-all-products', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await ProductController.getAllProducts();
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});

ProductRouter.post('/get-one-product-by-id/:id', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await ProductController.getOneProductByID(parseInt(req.params.id));
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});

export default ProductRouter;