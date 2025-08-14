import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/jwtGuard';
import { APP_GUARD } from '@nestjs/core';
import { AutoInfracaoModule } from './autoInfracao/autoInfracao.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [AuthModule, PrismaModule, AutoInfracaoModule, JwtModule.register({
    secret: 'seu-segredo',
    signOptions: { expiresIn: '1h' },
  }), UsuarioModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
