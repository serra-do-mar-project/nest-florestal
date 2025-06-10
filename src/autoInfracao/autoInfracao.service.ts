import {Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AutoInfracaoService {
    constructor(private prisma: PrismaService) {}

    async getExemploCaso() {
        return this.prisma.exemploCaso.findMany();
    }

    // async createAutoInfracao(data: any) {
    //     return this.prisma.AutoInfracao.create({
    //         data: {
    //             ...data,
    //         },
    //     });
    // }
}
