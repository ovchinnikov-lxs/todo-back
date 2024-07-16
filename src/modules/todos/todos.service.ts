import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

// Model
import { Todo } from './todo.entity';
// Dto
import { TodoCreateDto } from './dto/todo.create.dto';
import { TodoUpdateDto } from './dto/todo.update.dto';

@Injectable()
export class TodosService {
    constructor(@InjectModel(Todo) private readonly todoRepository: typeof Todo) {}

    async create(todo: TodoCreateDto, user_id: string) {
        return await this.todoRepository.create({ ...todo, user_id,});
    }

    async updateOneById(id: string, data: TodoUpdateDto): Promise<Todo> {
        console.log(id)
        const todo = await this.todoRepository.findOne(({ where: { id }}));

        console.log(todo);

        if (todo) {
            return await todo.update(data);
        }

        // todo: Добавить обработку ошибки - Такой задачи не существует
    }

    async deleteOneById(id) {
        return await this.todoRepository.destroy({ where: { id }});
    }

    async getAllByUserId(user_id: string): Promise<Array<Todo>> {
        return await this.todoRepository.findAll({
            where: { user_id },
            order: [
                ['createdAt', 'ASC'],
            ], });
    }

    async getOneByUserId(user_id: string): Promise<Todo> {
        return await this.todoRepository.findOne({ where: { user_id } });
    }
}
