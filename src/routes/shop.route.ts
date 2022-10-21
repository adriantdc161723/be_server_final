import express, {Router, Request, Response} from 'express';
import ShopController from '../controllers/shop.controller';
import authService from '../services/auth.service';

const ShopRouter: Router = express.Router();

ShopRouter.post('/create-shop', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await ShopController.createShop(req.body);
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});


ShopRouter.put('/update-shop', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await ShopController.updateShop(req.body);
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});


ShopRouter.put('/modify-shop-activation/:id', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await ShopController.modifyShopActivation(parseInt(req.params.id));
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});

ShopRouter.get('/get-all-shop', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await ShopController.getAllShop();
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});

ShopRouter.post('/get-one-shop-by-id/:id', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await ShopController.getOneShopByID(parseInt(req.params.id));
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});

export default ShopRouter;