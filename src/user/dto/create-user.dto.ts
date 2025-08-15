import {  IsEnum, IsString, Length, Matches, } from "class-validator";
import { TipoUsuarioEnum, User } from "../entities/user.entity";
import { tipo_usuario } from "@prisma/client";

export class CreateUserDto {
@Matches(/^\d+$/, { message: 'CPF deve conter apenas números'})
@Length(11, 11, { message: 'CPF deve conter 11 números'})
cpf: string;

@IsString()
nome: string;

@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'})
senha: string;

@IsEnum(TipoUsuarioEnum, {message: 'seu tipo deve ser FISCAL ou ADMINISTRADOR'})
tipo: TipoUsuarioEnum;

}