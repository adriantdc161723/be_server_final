import express, {Router, Request, Response} from 'express';
import CartController from '../controllers/cart.controller';
import authService from '../services/auth.service';

const CartRouter: Router = express.Router();

CartRouter.post('/add-to-cart', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await CartController.addToCart(req.body);
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});

CartRouter.get('/get-all-carts', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await CartController.getAllCarts();
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});


CartRouter.post('/get-one-cart-by-id/:id', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await CartController.getOneCartById(parseInt(req.params.id));
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});


CartRouter.put('/modify-cart-activation/:id', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await CartController.modifyCartActivation(parseInt(req.params.id));
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});


CartRouter.post('/get-all-carts-by-user-id/:id', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await CartController.getAllCartsByUserId(parseInt(req.params.id));
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});

export default CartRouter;