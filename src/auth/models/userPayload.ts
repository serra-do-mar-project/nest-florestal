export interface UserPayload {
    cpf: string;
    nome: string;
    tipo: number;
    iat?: number; // issued at: data de emissão
    exp?: number; // expiration: data de expiração
}