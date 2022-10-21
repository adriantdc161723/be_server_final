import express, {Router, Request, Response} from 'express';
import TransactionController from '../controllers/transaction.controller';
import authService from '../services/auth.service';

const TransactionRouter: Router = express.Router();

TransactionRouter.post('/check-out', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await TransactionController.checkOut(req.body);
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});


TransactionRouter.get('/get-all-transactions', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await TransactionController.getAllTransactions();
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});

TransactionRouter.post('/get-one-transaction-by-id/:id', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await TransactionController.getOneTransactionById(parseInt(req.params.id));
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});

TransactionRouter.put('/update-transaction', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await TransactionController.updateTransaction(req.body);
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});

export default TransactionRouter;