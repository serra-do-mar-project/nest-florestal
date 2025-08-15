import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AutoInfracaoService {
    constructor(private prisma: PrismaService) {}
    
    async getInfracoes() {
        const autosNaoDespachados = await this.prisma.infracao.findMany();
        return autosNaoDespachados;
    }
}
