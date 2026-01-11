import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SkipLogin } from '../../common/decorators/auth.decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 普通登录
  @SkipLogin()
  @Post('/sign-in')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // google 登录
  @SkipLogin()
  @Post('/sign-in/google')
  async loginByGoogle(){

  }

  // 注册
  @Post('/sign-up')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('/profile')
  async profile() {}

  @Post('/logout')
  async logout() {
    return this.authService.logout();
  }
}
