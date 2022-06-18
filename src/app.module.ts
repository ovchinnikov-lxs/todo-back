import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TodosModule } from "./modules/todos/todos.module";
// Models
import { User } from './modules/users/user.entity';
import { Todo } from './modules/todos/todo.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME_DEVELOPMENT,
      models: [
        User,
        Todo,
      ],
      autoLoadModels: true,
    }),
    // Users Modules
    AuthModule,
    UsersModule,
    TodosModule,
  ],
})
export class AppModule {}
