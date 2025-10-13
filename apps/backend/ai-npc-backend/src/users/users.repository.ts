import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaClientService } from 'src/prisma/prisma-client.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaClientService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }
}
