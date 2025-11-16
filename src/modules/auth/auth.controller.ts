import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SkipLogin } from '../../common/decorators/auth.decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipLogin()
  @Post('/sign-in')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

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
