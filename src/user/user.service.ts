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

    //entrar no sistema
    findByCpf(cpf: string) {
    return this.prisma.fiscal.findUnique({ where: { CPF: cpf }, select: { CPF: true, Nome: true, Senha: true, Tipo: true } });
  }

}
