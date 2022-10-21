import express, {Router, Request, Response} from 'express';
import UserController from '../controllers/user.controller';
import authService from '../services/auth.service';

const UserRouter: Router = express.Router();


UserRouter.post('/sign-up-user', async (req: Request, res: Response) => {
    const response = await UserController.signupUser(req.body);
    return res.status(200).send(response);
});

UserRouter.post('/login-user', async (req: Request, res: Response) => {
    const response = await UserController.loginUser(req.body);
    return res.status(200).send(response);
});

UserRouter.put('/modify-user-activation/:id', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            const response = await UserController.modifyUserActivation(parseInt(req.params.id));
            return res.status(response.status).send(response);
        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

    
});


UserRouter.get('/get-all-users', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await UserController.getAllUsers();
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }

});

UserRouter.post('/get-one-user-by-id/:id', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await UserController.getOneUserByID(parseInt(req.params.id));
            return res.status(response.status).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }
});


UserRouter.post('/get-user-details-by-username/:username', async (req: Request, res: Response) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const authenticate = await authService.verify(token);

        if(authenticate.status === 200){
            
            const response = await UserController.getUserDetailsByUsername(req.params.username);
            return res.status(200).send(response);

        } else {
            return res.status(authenticate.status).send(authenticate);
        }
    } else {
        return res.status(400).send({message: "NO TOKEN!"});
    }
});

export default UserRouter;