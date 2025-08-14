import { tipo_usuario } from "@prisma/client";
import { isEnum, IsIn,  IsNotEmpty } from "class-validator";


export class SignupDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  password: string;

  @IsIn(Object.values(tipo_usuario))
  @IsNotEmpty()
  type: tipo_usuario;
}