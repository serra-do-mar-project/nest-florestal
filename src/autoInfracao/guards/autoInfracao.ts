/*

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AutoInfracaoGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    // Expected format: "Bearer <token>"
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid Authorization header format');
    }

    // Example token check (replace with real validation logic)
    if (token === 'secret-token') {
      return true; // Authorized
    }

    throw new UnauthorizedException('Invalid token');
  }
}

*/
