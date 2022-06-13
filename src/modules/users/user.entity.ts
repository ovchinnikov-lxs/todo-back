import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttrs {
    login: string;
    password: string;
}

@Table
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000', description: 'id' })
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    id: string;

    @ApiProperty({ example: 'login', description: 'login' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    login: string;

    @ApiProperty({ example: '****', description: 'Пароль' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;
}
