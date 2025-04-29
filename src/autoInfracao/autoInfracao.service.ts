import {Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AutoInfracaoService {
    constructor(private prisma: PrismaService) {}

    async getExemploCaso() {
        return this.prisma.exemploCaso.findMany();
    }

    async getAutosNaoDespachados() {
        const autosNaoDespachados = await this.prisma.autoInfracao.findMany({
        where: {
            Despachado: false,
        }});
        return autosNaoDespachados;
    }

    // async createAutoInfracao(data: any) {
    //     return this.prisma.AutoInfracao.create({
    //         data: {
    //             ...data,
    //         },
    //     });
    // }
}
