import * as dotenv from 'dotenv';
dotenv.config();

import { forwardRef, Module } from '@nestjs/common';

// Modules
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

// Strategy
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

// Auth Module
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        PassportModule,
        forwardRef(() => UsersModule),
        JwtModule.register({
            secret: process.env.JWT_KEY,
            signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
        }),
    ],
    exports: [
        AuthService,
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
    controllers: [AuthController],
})
export class AuthModule { }
