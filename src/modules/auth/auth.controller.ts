import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
// Services
import { AuthService } from './auth.service';
// Dto
import { UserCreateDto } from '../users/dto/user.create.dto';
// Guards
import { AuthGuard } from '@nestjs/passport';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @UseGuards(DoesUserExist)
    @Post('signup')
    async signUp(@Body() user: UserCreateDto) {
        return await this.authService.create(user);
    }
}
