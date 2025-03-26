import {Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async signin(dto: SigninDto) {
        
    }
    
    async signup(dto: SignupDto) {
        
    }
}
