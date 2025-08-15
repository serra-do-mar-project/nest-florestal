import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/authRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { IsAdmin } from './decorators/is-admin.decorator';
import { AdminGuard } from './guards/admin.guard';
import { copyFile } from 'fs';
import { DeleteRequest } from './models/deleteRequest';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)  //usa a estratégia local
     login(@Request() req: AuthRequest) {
        return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(LocalAuthGuard)
  profile(@Request() req: AuthRequest) {
    return req.user;
  }

}