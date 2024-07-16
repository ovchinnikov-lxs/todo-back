import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';

// Models
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    providers: [
        UsersService,
    ],
    imports: [
        SequelizeModule.forFeature([User]),
        forwardRef(() => AuthModule),
    ],
    exports: [
        UsersService,
    ],
})
export class UsersModule {}
