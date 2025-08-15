import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Post('signin')
  login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto);
  }

}