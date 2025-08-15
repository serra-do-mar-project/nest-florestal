export interface UserPayload {
    cpf: string;
    nome: string;
    tipo: string;
    iat?: number;
    exp?: number;
}