import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { DeleteUserDto } from 'src/auth/dto/delete.dto';

@Injectable()
export class UsuarioService {

  findOne(dto: DeleteUserDto) {
    const user = dto.cpf;

    if(!user) {
      throw new Error('Usuário nao encontrado');
    }
  }

  remove(dto: DeleteUserDto) {
    return `This action removes a #${dto.cpf} usuario`;
  }
}
