import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/userPayload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
    constructor(private userService: UserService, private readonly jwtService: JwtService) { }

    login(user: User) {
      const payload: UserPayload = {
        cpf: user.cpf,
        name: user.name,
      };

      return {
        access_token: this.jwtService.sign(payload),
      };

    }


    async validateUser(cpf: string, senha: string) {
        
        const user = await this.userService.findByCpf(cpf)
        console.log('Usuário encontrado:', user);




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
