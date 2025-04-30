import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',  // Defina sua chave secreta aqui
      signOptions: { expiresIn: '1h' },  // Tempo de expiração do token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // Aplicando o guard globalmente
    },
  ]
})
export class AuthModule {}