import { CreateAutoInfracaoDto } from "./create-autoinfracao.dto";

export class CreateRelatorioDto {
    id: number;
    equipe: string;
    equipeEmAtuacao: string;
    orgaosEInstituicoesEnvolvadas: string;
    responsavel: string;
    dataHoraInicioAcao: string; 
    dataHoraTerminoAcao: string;
    origem: string; 
    registroOcorrencia: boolean;
    areaFiscalizada: boolean;
    municipios: string; 
    setores: string;
    especificacaoLocal: string;
    relatorio: string;
    outrasAtividades: string;
    cordenadas: string;
    placaVtr?: string;
    kmInicio?: number;
    kmFinal?: number;
    condicoesVtr?: string;
    tipoAcao: string; 
    veiculosAbordados?: string;
    tipoVeiculoAbordado?: string;
    descricaoVeiculos?: string;
    kmPercorrido: number;
    horas: number;
    processado: boolean;

    fiscalId: number;

    autoinfracoes?: CreateAutoInfracaoDto[];
    
}