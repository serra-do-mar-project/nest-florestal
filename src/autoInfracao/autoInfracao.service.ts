import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwtGuard';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AutoInfracaoService {
    constructor(private prisma: PrismaService) {}
    
    async getInfracoes() {
        const autosNaoDespachados = await this.prisma.infracao.findMany();
        return autosNaoDespachados;
    }
}
