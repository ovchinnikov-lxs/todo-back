import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
// Model
import { User } from './user.entity';
// Dto
import { UserCreateDto } from './dto/user.create.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private readonly userRepository: typeof User) { }

    async create(user: UserCreateDto) {
        return await this.userRepository.create(user);
    }

    async findOneByLogin(login: string) {
        return await this.userRepository.findOne({ where: { login } });
    }

    async findOneById(id: string) {
        return await this.userRepository.findOne({ where: { id } });
    }
}
