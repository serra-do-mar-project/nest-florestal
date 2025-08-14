import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwtGuard';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AutoInfracaoService {
    constructor(private prisma: PrismaService) {}

    async getExemploCaso() {
        return this.prisma.exemplocaso.findMany();
    }
}
