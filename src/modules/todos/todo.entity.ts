import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

// Swagger
import { ApiProperty } from '@nestjs/swagger';
import { User } from "../users/user.entity";

interface TodoCreationAttrs {
    fulfilled: boolean;
    title: string;
    user_id: string;
}

@Table
export class Todo extends Model<Todo, TodoCreationAttrs> {
    @ApiProperty({ example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000', description: 'id' })
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    id: string;

    @ApiProperty({ example: false, description: 'status'})
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    fulfilled: boolean;

    @ApiProperty({ example: 'Помыть посуду', description: 'todo title'})
    @Column({
        type: DataType.STRING,
        defaultValue: '',
    })
    title: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
    })
    user_id: string;

    @BelongsTo(() => User)
    user: User;
}
