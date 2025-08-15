import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
})
export class AuthModule { }
