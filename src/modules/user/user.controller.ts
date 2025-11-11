import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

// 用户类，后续实现增删改查
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create() {
    return 'create the user';
  }

  @Get()
  async getUser() {
    return 'return the users list';
  }
}
