import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService, // JWT Service para validar o token
    private reflector: Reflector, // Para acessar metadados (como roles, etc.)
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Verifica se a rota não exige um guard específico ou se a rota é pública
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1]; // 'Bearer <token>'
    if (!token) {
      return false;
    }

    try {
      // Verifica se o token é válido
      const payload = this.jwtService.verify(token);
      request.user = payload; // Armazena o usuário no request para uso posterior
      return true;
    } catch (error) {
      return false;
    }
  }
}
