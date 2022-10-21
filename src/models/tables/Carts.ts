import {Table, Column, DataType, Model, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, HasOne, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import Products from './Products';
import Shops from './Shops';
import Users from './Users';


@Table({ tableName: 'Carts'})
class Carts extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;

    @BelongsTo( ()=> Users)
    userDetails?: Users;

    @ForeignKey( ()=> Users )
    @Column (DataType.INTEGER) user_id?: number; 

    @BelongsTo( ()=> Products)
    productDetails?: Products

    @ForeignKey( ()=> Products)
    @Column(DataType.INTEGER) product_id?: number;

    @ForeignKey( ()=> Shops)
    @Column(DataType.INTEGER) shop_id?: number;
    
    @Column (DataType.BOOLEAN) is_active?: boolean;
    @CreatedAt createdAt?: Date;
    @UpdatedAt updatedAt?: Date;

}

export default Carts;