import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) { }
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
