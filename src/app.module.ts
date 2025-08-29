import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
<<<<<<< HEAD
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, UserModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' },
  }), UserModule, UserModule, AuthModule, AppModule],
  controllers: [AppController],
  providers: [ AppService,
    {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }

=======
import { AutoInfracaoModule } from './autoInfracao/autoInfracao.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [AuthModule, PrismaModule, AutoInfracaoModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
>>>>>>> c2b7251945ffeef34e8f235c6ec501514ea14a81
  ],
})
export class AppModule { }
