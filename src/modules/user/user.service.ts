import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../../generated/prisma/client';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create() {}

  async findUnique(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {}
}
