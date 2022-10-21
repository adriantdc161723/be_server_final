import {Table, Column, DataType, Model, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, HasOne, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import Shops from './Shops';


@Table({ tableName: 'Products'})
class Products extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;

    @Column (DataType.STRING) name?: string;

    @Column (DataType.DECIMAL(10, 2)) price?: number;

    @Column (DataType.BOOLEAN) is_active?: boolean;

    @CreatedAt createdAt?: Date;
    @UpdatedAt updatedAt?: Date;

    
    @BelongsTo(()=> Shops)
    shopDetails?: Shops;

    @ForeignKey(()=> Shops)
    @Column (DataType.INTEGER) shop_id?: number; 
}

export default Products;