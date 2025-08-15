import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, JwtModule.register({
    secret: 'seu-segredo',
    signOptions: { expiresIn: '1h' },
  }), UserModule, UserModule],
  controllers: [],
  providers: [
   
  ],
})
export class AppModule {}
