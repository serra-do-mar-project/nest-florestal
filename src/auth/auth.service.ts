import { BadRequestException, Body, CanActivate, Header, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/userPayload';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { extractCpfFromToken } from './middleware/verify-cpf';





@Injectable()
export class AuthService {
  
  constructor(private userService: UserService, private readonly jwtService: JwtService, protected prisma: PrismaService) { }
  

  //realizar login gerando token de acesso
  login(user: User) {
    const payload: UserPayload = {
      cpf: user.cpf,
      nome: user.name,
      tipo: user.tipo
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
    
  }

  //verificar perfil
  profile(user: User) {
    const payload: UserPayload = {
      cpf: user.cpf,
      nome: user.name,
      tipo: user.tipo
    };
    
    return this.jwtService.sign(payload);
  }


  //atualizar senha. Rota para usuário logado
   async updatePassword(cpf: string, currentPassword: string, newPassword: string, newPasswordConfirm: string) {
    const user = await this.userService.findByCpf(cpf);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const passwordMatches = await bcrypt.compare(currentPassword, user.senha);

    if (!passwordMatches) {
      throw new BadRequestException('Senha atual incorreta');
    }

    if (newPassword !== newPasswordConfirm) {
      throw new BadRequestException('Senhas nao conferem');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.fiscal.update({
      where: { cpf: user.cpf },
      data: { senha: hashedNewPassword },
    });

    return { message: 'Senha atualizada com sucesso' };
  }


  //Reset de senha. Rota pública e comum a todos os usuários
  async updateOwnPassword(password: string, passwordConfirm: string, cpf: string) {

    const user = await this.userService.findByCpf(cpf);

    if (!user) throw new NotFoundException('Usuário nao encontrado');

    if (password !== passwordConfirm) {
      throw new BadRequestException('Senhas nao conferem');
    }

    const hashedNewPassword = await bcrypt.hash(password, 10);

    await this.prisma.fiscal.update({
      where: { cpf: user.cpf },
      data: { senha: hashedNewPassword },
    });

    return { message: 'Senha atualizada com sucesso' };

  }

  async updateAnyPassword (password: string, cpf:string, newPassword: string) {
    const user = this.userService.findByCpf(cpf)

    if(!user) {
      throw new NotFoundException('usuário não encontrado')
    }

    const userAdm = this.userService.findByCpf(extractCpfFromToken['cpf'])

    if(!userAdm) {
      throw new NotFoundException('senha incorreta')
    }

    
  }

  //
  async validateUser(cpf: string, senha: string) {

    const user = await this.userService.findByCpf(cpf)
   
    if (user) {
      //checar se a senha corresponde a hash que está no banco
      const isPasswordValid = await bcrypt.compare(senha, user.senha);

      if (isPasswordValid) {
        return {
          ...user,
          senha: undefined
        };
      }
    }
    //se chegar aqui, significa que o cpf ou senha estao errados
    throw new UnauthorizedException('CPF ou senha incorretos');
  }
}


