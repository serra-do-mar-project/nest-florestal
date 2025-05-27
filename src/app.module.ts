import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AutoInfracaoModule } from './autoInfracao/autoInfracao.module';

@Module({
  imports: [AuthModule, PrismaModule, AutoInfracaoModule],
})
export class AppModule {}
