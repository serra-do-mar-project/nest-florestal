import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IsAdmin } from 'src/auth/decorators/is-admin.decorator';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { DeleteRequest } from 'src/auth/models/deleteRequest';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @IsAdmin()
  @UseGuards(AdminGuard)
  @Post('signup')
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Post('signin')
  login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)  // garante que o AdminGuard roda nessa rota
  @IsAdmin()              // marca essa rota como apenas para admins
  async deleteUser(@Request() req: DeleteRequest) {
    // Aqui você chama o service que faz a exclusão do usuário no banco
    // Exemplo simplificado:
    return await this.userService.deleteUserByCpf(req.cpf);

  }
}