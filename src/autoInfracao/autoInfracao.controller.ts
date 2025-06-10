import { Body, Controller, Get, Post } from '@nestjs/common';
import { AutoInfracaoService } from './autoInfracao.service';

@Controller('autoInfracao')
export class AutoInfracaoController {
    constructor(private autoInfracaoService: AutoInfracaoService) {}

    @Get('exemploCaso')
    getExemploCaso() {
        return this.autoInfracaoService.getExemploCaso();
    }

    // @Post('autoInfracao')
    // createAutoInfracao(@Body() data: any) {
    //     return this.autoInfracaoService.createAutoInfracao(data);
    // }
}
