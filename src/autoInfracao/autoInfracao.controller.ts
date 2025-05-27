import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AutoInfracaoService } from './autoInfracao.service';
import { JwtAuthGuard } from 'src/auth/jwtGuard';

@Controller('autoInfracao')
export class AutoInfracaoController {
    constructor(private autoInfracaoService: AutoInfracaoService) {}

    @UseGuards(JwtAuthGuard)
    @Get('exemploCaso')
    getExemploCaso() {
        return this.autoInfracaoService.getExemploCaso();
    }

    @UseGuards(JwtAuthGuard)
    @Get('autosNaoDespachados')
    getAutosNaoDespachados() {
        return this.autoInfracaoService.getAutosNaoDespachados();
    }

    // @Post('autoInfracao')
    // createAutoInfracao(@Body() data: any) {
    //     return this.autoInfracaoService.createAutoInfracao(data);
    // }
}
