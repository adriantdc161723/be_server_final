import express, {Application, Request, json, Response} from 'express';
import dotenv, { DotenvConfigOutput } from 'dotenv';
import config from './config/config';
import cors from 'cors';

const app: Application = express();
const env_config: DotenvConfigOutput = dotenv.config();
const port = process.env.PORT || 1617;


//Middleware
app.use(json());
app.use(cors())

//Modules
import UserRouter from './routes/user.route';
import ShopRouter from './routes/shop.route';
import ProductRouter from './routes/product.route'
import CartRouter from './routes/cart.route'
import TransactionRouter from './routes/transaction.route'

//Routes
app.use(UserRouter);
app.use(ShopRouter);
app.use(ProductRouter);
app.use(CartRouter);
app.use(TransactionRouter);

let serve = async () => {
    await config.authenticate();
    await config.sync({force: false});
    app.listen(port, ()=>{
        console.log("Connected to port:", port);
    });    
}

serve();


