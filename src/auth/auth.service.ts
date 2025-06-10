import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt'; // Para fazer o hash da senha
import { JwtService } from '@nestjs/jwt'; // Para gerar o JWT

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    // Função para o signup (registro do usuário)
    async signup(dto: SignupDto) {
        // Verificar se o usuário já existe
        const userExists = await this.prisma.fiscal.findUnique({
            where: { CPF: dto.cpf },
        });

        if (userExists) {
            throw new Error('Usuário já existe');
        }

        // Hash da senha para segurança
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // Criar o novo usuário
        const user = await this.prisma.fiscal.create({
            data: {
                CPF: dto.cpf,
                Nome: dto.name,
                Senha: hashedPassword,
                Tipo: dto.type,
            },
        });

        // Gerar o JWT (token) para o usuário
        const token = this.jwtService.sign({ cpf: user.CPF });

        return {
            message: 'Usuário registrado com sucesso!',
            token,
        };
    }

    // Função para o signin (login do usuário)
    async signin(dto: SigninDto) {
        // Verificar se o usuário existe
        const user = await this.prisma.fiscal.findUnique({
            where: { CPF: dto.cpf },
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Verificar se a senha está correta
        const isPasswordValid = await bcrypt.compare(dto.password, user.Senha);
        console.log(isPasswordValid)

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        // Gerar o JWT (token) para o usuário
        const token = this.jwtService.sign({ cpf: user.CPF });

        return {
            message: 'Login bem-sucedido!',
            access_token: token,
        };
    }
}