import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,

} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/authRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { copyFile, cp } from 'fs';
import { updatePassword } from './models/updatePassword';
import { IsSelf } from './decorators/is-self.decorator';
import { IsAdmin } from './decorators/is-admin.decorator';



@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)  //usa a estratégia local
     login(@Request() req: AuthRequest) {
        return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(LocalAuthGuard)
  profile(@Request() req: AuthRequest) {
    return req.user;
  }

  @IsSelf()
  @Put('updatePassword')
  async resetPassword(@Body() req: updatePassword) {
    // Exemplo simplificado:
    return this.authService.updatePassword(req.cpf, req.senhaAntiga, req.novaSenha, req.confirmaSenha);
  }

  //fazer rota de reset restrita aos admins

  @IsPublic()
  @Put('reset')
  async updatePassword(@Body() req: updatePassword) {
    // Exemplo simplificado:
    return this.authService.updateOwnPassword(req.novaSenha, req.confirmaSenha, req.cpf);
  }



}