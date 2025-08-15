import { tipo_usuario } from "@prisma/client";

//é preciso definir um enum em ts que reflita o que vem do banco:
export enum TipoUsuarioEnum {
  fiscal = 'fiscal',
  administrador = 'administrador',
}

// representação da entidade no banco:
export class User {
    cpf: string;
    name: string;
    password: string;
    tipo: TipoUsuarioEnum;
}
