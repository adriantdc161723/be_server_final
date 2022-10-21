import {Table, Column, DataType, Model, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, HasOne, HasMany } from 'sequelize-typescript';
import Products from './Products';

@Table({ tableName: 'Shops'})
class Shops extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column (DataType.INTEGER) id?: number;
    @Column (DataType.STRING) name?: string;
    @Column (DataType.STRING) address?: string;
    @Column (DataType.STRING) business_type?: string;
    @Column (DataType.BOOLEAN) is_active?: boolean;
    @CreatedAt createdAt?: Date;
    @UpdatedAt updatedAt?: Date;
    @HasMany(()=> Products)
    products?: Products[] = [];
}

export default Shops;