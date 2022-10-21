import dotenv, { DotenvConfigOutput } from 'dotenv';
const env_config: DotenvConfigOutput = dotenv.config();
import * as jwt from 'jsonwebtoken';


import ResponseUtil from '../utils/response.util';

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
    INTERNAL_SERVER_ERROR_MESSAGE
} from '../utils/message.util';



class AuthService extends ResponseUtil {

    async auth(requestObject: any) {
        try {
            
            const SECRET_KEY: any = process.env.SECRET_KEY;
            const authentication = jwt.sign(requestObject, SECRET_KEY);

            if(authentication){
                return this.RESPONSE(OK, {accessToken: authentication}, 0, OK_MESSAGE);
            }else{
                return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE);
            }


        } catch (error: any) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.messages);
        }
    }


    async verify(token: any){
        try {

            const SECRET_KEY: any = process.env.SECRET_KEY;
            let authentication = jwt.verify(token, SECRET_KEY);
            
            if(authentication){
                return this.RESPONSE(OK, authentication, 0, OK_MESSAGE);
            }else{
                return this.RESPONSE(BADREQUEST, {}, 0, BADREQUEST_MESSAGE);
            }
        } catch (error: any) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.messages);
        }
    }

}

export default new AuthService;