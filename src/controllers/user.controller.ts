import UserService from "../services/user.service";
import { User } from '../models/dto/Users.dto';

class UserController{

    async signupUser (dto: User){
        const response = await UserService.signupUser(dto);
        return response;
    }

    async loginUser (dto: User){
        const response = await UserService.loginUser(dto);
        return response;
    }

    async modifyUserActivation (userId: User["id"]){
        const response = await UserService.modifyUserActivation(userId);
        return response;
    }

    async getAllUsers (){
        const response = await UserService.getAllUsers();
        return response;
    }

    async getOneUserByID (userId: User["id"]){
        const response = await UserService.getOneUserByID(userId);
        return response;
    }

    async getUserDetailsByUsername (username: User["username"]){
        const response = await UserService.getUserDetailsByUsername(username);
        return response;
    }


}

export default new UserController;