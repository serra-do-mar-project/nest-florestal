export class CreateAutoInfracaoDto {
    dataEmissao: string;
    cpf: string;
    idExemplocaso: number;
    descricao: string;

    relatoriodiarioId?: number;
}