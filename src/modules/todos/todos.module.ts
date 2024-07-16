import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// Services
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

// Controllers
import { TodosController } from "./todos.controller";

@Module({
    providers: [
        TodosService,
    ],
    imports: [
        SequelizeModule.forFeature([Todo]),
        forwardRef(() => TodosModule),
    ],
    exports: [
        TodosService,
    ],
    controllers: [TodosController],
})
export class TodosModule {}
