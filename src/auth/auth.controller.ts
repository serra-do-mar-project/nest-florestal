import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: SignupDto) {
        return this.authService.signup(dto)
    }

    @Public()
    @Post('signin')
    signin(@Body() dto: SigninDto) {
        return this.authService.signin(dto)
    }
}
