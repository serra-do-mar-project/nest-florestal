import {
  Body,
  Controller,
  Delete,
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
import { updatePassword } from './models/updatePassword';
import { IsSelf } from './decorators/is-self.decorator';
import { IsAdmin } from './decorators/is-admin.decorator';
import { DeleteRequest } from './models/deleteRequest';



@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @IsAdmin()
  @Post('signup')
  signup(@Body() user: any) {
    return this.authService.signup(user);
  }


  @IsPublic()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
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


  @IsAdmin()              // marca essa rota como apenas para admins
  @Delete('delete')
  async deleteUser(@Body() req: DeleteRequest) {
    // Aqui você chama o service que faz a exclusão do usuário no banco
    // Exemplo simplificado:
    return await this.authService.deleteUserByCpf(req.cpf);

  }



}