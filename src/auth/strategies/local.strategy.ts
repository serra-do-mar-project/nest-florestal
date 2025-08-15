import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'cpf' }); //padrão do passport local
    }

    //extrai informação do body e passa para o authService
    validate(cpf: string, password: string) {
        console.log('LocalStrategy validate called with:', cpf, password);

        return this.authService.validateUser(cpf, password);
    }
}