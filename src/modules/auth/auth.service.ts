import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { compareHash } from '../../common/utils/hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // 表示无需登录即可访问
  async login(loginDto: LoginDto) {
    const { password, email } = loginDto;

    const user = await this.userService.findUnique({
      email,
    });
    if (!user) throw new BadRequestException('无效账号！');
    const isSamePassword = await compareHash(password, user.password);
    if (!isSamePassword) {
      throw new BadRequestException('密码错误，请重试！');
    }
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      token,
    };
  }

  async register(registerDto: RegisterDto) {
    console.log(registerDto);
  }

  async profile() {}

  async logout() {}
}
