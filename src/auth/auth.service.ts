import {
  BadRequestException,
  Body,
  CanActivate,
  Header,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/userPayload';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { extractCpfFromToken } from './middleware/verify-cpf';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    protected prisma: PrismaService,
  ) {}

  //criar um novo usuário
  async signup(user: User) {
    // Verificar se o usuário já existe
    const userExists = await this.prisma.fiscal.findUnique({
      where: { CPF: user.cpf },
    });

    if (userExists) {
      throw new Error('Usuário já existe');
    }

    // Hash da senha para segurança
    const hashedPassword = await bcrypt.hash(user.senha, 10);

    // Criar o novo usuário
    const newUser = await this.prisma.fiscal.create({
      data: {
        CPF: user.cpf,
        Nome: user.nome,
        Senha: hashedPassword,
        Tipo: user.tipo,
      },
    });

    // Verificar se o usuário foi criado com sucesso
    if (!newUser) {
      throw new Error('Erro ao criar o usuário');
    }

    // converter o tipo para string
    const roleMap = {
      0: 'fiscal',
      1: 'administrador',
    };

    //payload para o token
    const payload: UserPayload = {
      cpf: user.cpf,
      nome: user.nome,
      tipo: roleMap[user.tipo],
    };

    //gerar token
    const token = this.jwtService.sign(payload);

    return {
      status: 'success',
      message: 'Usuário registrado com sucesso!',
      token,
    };
  }

  //realizar login gerando token de acesso
  async login(user: LoginUserDto) {
    //verificar se cpf exite:
    const verifyUser = await this.prisma.fiscal.findUnique({
      where: { CPF: user.cpf },
    });

    if (!verifyUser) throw new NotFoundException('Usuário nao encontrado');

    //verificar se a senha corresponde
    const isPasswordValid = await bcrypt.compare(user.senha, verifyUser.Senha);

    if (!isPasswordValid) throw new UnauthorizedException('Senha incorreta');

    // converter o tipo para string
    const roleMap = {
      0: 'fiscal',
      1: 'administrador',
    };

    //payload para o token
    const payload: UserPayload = {
      cpf: user.cpf,
      nome: verifyUser.Nome,
      tipo: roleMap[verifyUser.Tipo],
    };

    //gerar token
    return {
      status: 'success',
      // user: {
      //   id: user.id,
      //   nome: user.nome,
      //   tipo: user.tipo
      // }
      token: this.jwtService.sign(payload),
    };
  }

  // //verificar perfil para
  // profile(user: User) {
  //   const payload: UserPayload = {
  //     cpf: user.cpf,
  //     nome: user.nome,
  //     tipo: user.tipo
  //   };

  //   return this.jwtService.sign(payload);
  // }

  //atualizar senha. Rota para usuário logado
  async updatePassword(
    cpf: string,
    currentPassword: string,
    newPassword: string,
    newPasswordConfirm: string,
  ) {
    //verificar se cpf exite:
    const user = await this.userService.findByCpf(cpf);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    //verificar se a senha atual esta correta
    const passwordMatches = await bcrypt.compare(currentPassword, user.Senha);

    if (!passwordMatches) {
      throw new BadRequestException('Senha atual incorreta');
    }

    //verificar se as senhas novas conferem
    if (newPassword !== newPasswordConfirm) {
      throw new BadRequestException('Senhas nao conferem');
    }

    //hash da nova senha
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    //atualizar senha
    await this.prisma.fiscal.update({
      where: { CPF: user.CPF },
      data: { Senha: hashedNewPassword },
    });

    return { status: 'success', message: 'Senha atualizada com sucesso' };
  }

  //Reset de senha. Rota somente para administradores
  async updateOwnPassword(
    password: string,
    passwordConfirm: string,
    cpf: string,
  ) {
    //verificar se cpf exite:
    const user = await this.userService.findByCpf(cpf);

    if (!user) throw new NotFoundException('Usuário nao encontrado');

    //verificar se as senhas novas conferem
    if (password !== passwordConfirm) {
      throw new BadRequestException('Senhas nao conferem');
    }

    //hash da nova senha
    const hashedNewPassword = await bcrypt.hash(password, 10);

    //atualizar senha
    await this.prisma.fiscal.update({
      where: { CPF: user.CPF },
      data: { Senha: hashedNewPassword },
    });

    return { status: 'success', message: 'Senha atualizada com sucesso' };
  }

  //Rota para administradores. Atualizar senha de qualquer usuário
  async updateAnyPassword(
    adminPassword: string,
    targetCpf: string,
    newPassword: string,
  ) {
    // Buscar o usuário alvo (cuja senha será alterada)
    const user = await this.userService.findByCpf(targetCpf);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Extrair CPF do admin autenticado (exemplo: vindo do token)
    const adminCpf = extractCpfFromToken['cpf'];
    const adminUser = await this.userService.findByCpf(adminCpf);

    if (!adminUser) {
      throw new NotFoundException('Administrador não encontrado');
    }

    // Verificar se a senha informada é a senha do admin
    const passwordMatches = await bcrypt.compare(
      adminPassword,
      adminUser.Senha,
    );

    if (!passwordMatches) {
      throw new BadRequestException('Senha do administrador incorreta');
    }

    // Atualizar a senha do usuário alvo
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.Senha = hashedNewPassword;

    //atualizar senha do usuario alvo
    await this.prisma.fiscal.update({
      where: { CPF: user.CPF },
      data: { Senha: hashedNewPassword },
    });

    return { status: 'success', message: 'Senha alterada com sucesso' };
  }

  async deleteUserByCpf(cpf: string) {
    //verificar se cpf exite:
    const user = await this.userService.findByCpf(cpf);

    if (!user) {
      return { message: 'Usuário nao encontrado' };
    }
    //se chegou aqui, significa que o cpf existe
    await this.prisma.fiscal.delete({ where: { CPF: user.CPF } });

    return { status: 'success', message: 'Usuário excluido com sucesso' };
  }

  async validateUser(cpf: string, senha: string) {
    const user = await this.userService.findByCpf(cpf);

    if (user) {
      //checar se a senha corresponde a hash que está no banco
      const isPasswordValid = await bcrypt.compare(senha, user.Senha);

      if (isPasswordValid) {
        return {
          ...user,
          senha: undefined,
        };
      }
    }
    //se chegar aqui, significa que o cpf ou senha estao errados
    throw new UnauthorizedException('CPF ou senha incorretos');
  }
}
