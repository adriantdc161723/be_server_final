import {Table, Column, DataType, Model, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, HasOne, HasMany } from 'sequelize-typescript';
import Carts from './Carts';
import Transactions from './Transactions';


@Table({ tableName: 'Users'})
class Users extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;
    @Column (DataType.STRING) username?: string;
    @Column (DataType.STRING) password?: string;
    @Column (DataType.BOOLEAN) is_active?: boolean;
    @CreatedAt createdAt?: Date;
    @UpdatedAt updatedAt?: Date;
    @HasMany(()=> Carts )
    cart?: Carts[] = [];
    @HasMany(()=> Transactions)
    transactions?: Transactions[] = [];
}

export default Users;