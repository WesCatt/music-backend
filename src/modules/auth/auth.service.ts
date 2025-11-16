import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(loginDto: LoginDto) {
    console.log(loginDto);
  }

  async register(registerDto: RegisterDto) {
    console.log(registerDto);
  }

  async profile() {}

  async logout() {}
}
