import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) {}


  async create(dto: CreateUserDto) {
    const user = {
      cpf: dto.cpf,
      nome: dto.nome,
      tipo: dto.tipo,
      senha: await bcrypt.hash(dto.senha, 10),
    };

    //cria no bd o user
    const createdUser = await this.prisma.fiscal.create({ data: user });

    return {
      cpf: createdUser.cpf,
      name: createdUser.nome,
      tipo: createdUser.tipo
    };
  }


  async login(dto: LoginUserDto) {
    const user = await this.prisma.fiscal.findUnique({ where: { cpf: dto.cpf } });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(dto.senha, user.senha);

    if (!isPasswordValid) {
      throw new Error('Senha inválida');
    }
    return {
      cpf: user.cpf,
      nome: user.nome
    };
  }

  findByCpf(cpf: string) {
    return this.prisma.fiscal.findUnique({ where: { cpf }, select: { cpf: true, nome: true, senha: true, tipo: true } });
  }
}
