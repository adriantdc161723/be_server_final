import {Table, Column, DataType, Model, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, HasOne, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import Products from './Products';
import Shops from './Shops';
import Users from './Users';


@Table({ tableName: 'Transactions'})
class Transactions extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;

    @BelongsTo( ()=> Users)
    userDetails?: Users;

    @ForeignKey( ()=> Users )
    @Column (DataType.INTEGER) user_id?: number; 

    @BelongsTo( ()=> Shops)
    shopDetails?: Shops

    @ForeignKey( ()=> Shops)
    @Column(DataType.INTEGER) shop_id?: number;

    @CreatedAt transactionDate?: Date;
    
    @Column(DataType.DECIMAL(10,2)) totalPrice?: number;

    @Column(DataType.STRING) transactionStatus?: string;

    @Column (DataType.BOOLEAN) is_active?: boolean;
    @UpdatedAt updatedAt?: Date;

}

export default Transactions;