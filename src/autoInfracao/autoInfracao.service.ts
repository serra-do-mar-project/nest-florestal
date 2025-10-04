import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRelatorioDto } from './dto/create-relatorio.dto';

@Injectable()
export class AutoInfracaoService {
  constructor(private prisma: PrismaService) {}

  async getExemplosDeCasos() {
    const exemploDeCasos = await this.prisma.exemplocaso.findMany();
    return exemploDeCasos;
  }

  async createRelatorio(body: CreateRelatorioDto, requisicao: any) {

    const fiscal = await this.prisma.fiscal.findUnique({
      where: { cpf: requisicao.cpf },
    });

    if (!fiscal) {
      throw new Error('Fiscal nao autenticado');
    }

    const relatorio = await this.prisma.relatorio.create({
      data: {
        ...body,
        fiscalId: fiscal.id,
      },
    });

   if (body.autoinfracoes) {
    await this.prisma.autoinfracao.createMany({
      data: body.autoinfracoes.map((autoinfracao) => ({
        ...autoinfracao,
        relatoriodiarioId: relatorio.id,
      })),
    });
   }

   return relatorio;
   
  }
}
