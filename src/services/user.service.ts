import Users from '../models/tables/Users';

import ResponseUtil from '../utils/response.util';
import { User } from "../models/dto/Users.dto";
import * as bcrypt from 'bcrypt';


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
    INTERNAL_SERVER_ERROR_MESSAGE,
    USER_DOES_NOT_EXIST,
    NO_RECORD_FOUND
} from '../utils/message.util';
import e from "express";
import authService from "./auth.service";
import Carts from '../models/tables/Carts';
import Products from '../models/tables/Products';
import Shops from '../models/tables/Shops';
import Transactions from '../models/tables/Transactions';


class UserService extends ResponseUtil {

    include = [
        {
            model: Carts, 
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        },
        {
            model: Transactions, 
            attributes: {
                exclude: ["updatedAt"]
            }
        }
    ];

    //Sign up new user
    async signupUser (dto: User) {
        try {

            if(dto.password === dto.confirmPassword){

                //find if user is already existed
                const query = { where: { username: dto.username } };
                const exist = await Users.findOne(query);
                const count = await Users.count(query);

                if(!exist){

                    const passwordHashed = await bcrypt.hash(dto.password, 10);
                    const create = await Users.create({
                        username: dto.username,
                        password: passwordHashed,
                        is_active: true
                    });

                    return create
                        ? this.RESPONSE(CREATED, create, count, CREATED_MESSAGE)
                        : this.RESPONSE(BADREQUEST, {}, count, BADREQUEST_MESSAGE)

                } else {
                    return this.RESPONSE(BADREQUEST, {}, count, "Username already exist");
                }
            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, "Password not matched!");
            }
        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }

    }

    //Login user
    async loginUser (dto: User) {

        try {

            const query = { where: { username: dto.username, is_active: true } }
            const exist = await Users.findOne(query);
            const count = await Users.count(query);

            if(exist){

                const userHashedPassword: any = exist.password;
                const matchPassword: boolean = await bcrypt.compare(dto.password, userHashedPassword);

                const dataValues = {
                    id: exist.id, 
                    username: exist.username, 
                    password: exist.password, 
                    createdAt: exist.createdAt, 
                    updatedAt: exist.updatedAt}
                    
                if(matchPassword){
                    const token = await authService.auth(dataValues);
                    return this.RESPONSE(OK, token.response, 1, OK_MESSAGE);
                } else {
                    return this.RESPONSE(BADREQUEST, {}, 0, "Password not matched");
                }

            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, "User does not exist");
            }

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }

    }

    //activate|deactivate user
    async modifyUserActivation (userId: User["id"]) {
        try {

            const query = { where: { id: userId } };
            const exist = await Users.findOne(query);
            const count = await Users.count(query);

            if(exist){

                const query = {where: { id: exist.id } };
                const update = await Users.update({ is_active: !exist.is_active }, query);

                return update 
                    ? this.RESPONSE(UPDATE, update, count, UPDATE_MESSAGE)
                    : this.RESPONSE(BADREQUEST, {}, 0, "Modify user activation failed");

            } else {
                return this.RESPONSE(BADREQUEST, {}, 0, USER_DOES_NOT_EXIST);
            }

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }
    }


    //get all users
    async getAllUsers () {
        try {

            const query = { include: this.include }
            const findAllUsers = await Users.findAll(query);
            const count = await Users.count();

            return count
                ? this.RESPONSE(OK, findAllUsers, count, OK_MESSAGE)
                : this.RESPONSE(BADREQUEST, [], 0, NO_RECORD_FOUND);

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }
    }

    //get one user
    async getOneUserByID (userId: User["id"] = 0) {
        try {

            const query = {
                where: { id: userId },
                include: this.include
            }
            const findOneUser = await Users.findOne(query);
            const count = await Users.count(query);

            return count
                ? this.RESPONSE(OK, findOneUser, count, OK_MESSAGE)
                : this.RESPONSE(BADREQUEST, {}, count, USER_DOES_NOT_EXIST);

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }
    }

    async getUserDetailsByUsername (username: User['username']) {
        try {

            const query = {
                where: { username: username },
                include: this.include
            }
            const findOneUser = await Users.findOne(query);
            const count = await Users.count(query);

            return count
                ? this.RESPONSE(OK, findOneUser, count, OK_MESSAGE)
                : this.RESPONSE(BADREQUEST, {}, count, USER_DOES_NOT_EXIST);

        } catch (error: any) {
                return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, 0, error.message)
        }
    }

}

export default new UserService;