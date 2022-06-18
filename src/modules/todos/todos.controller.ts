import {
    Controller,
    Body,
    Post,
    UseGuards,
    Request,
    Get,
    Patch,
    Param,
    NotFoundException,
    Delete
} from '@nestjs/common';

// Services
import { TodosService } from './todos.service';

// Dto
import { TodoUpdateDto } from './dto/todo.update.dto';

// Guards
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
export class TodosController {
    constructor(private  todoService: TodosService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAll(@Request() req) {
        return await this.todoService.getAllByUserId(req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Request() req) {
        return await this.todoService.create({ fulfilled: false, title: '',}, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async updateOneById(@Param() { id }, @Body() todo: TodoUpdateDto) {
        const res = await this.todoService.updateOneById(id, todo);

        if (!res) {
            throw new NotFoundException('Такой задачи не существует');
        }

        return res;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteOneById(@Param() { id }) {
        const res = await this.todoService.deleteOneById(id);

        if (!res) {
            throw new NotFoundException('Такой задачи не существует');
        }

        return res;
    }
}
