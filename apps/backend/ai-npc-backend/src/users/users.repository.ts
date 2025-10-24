import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientService } from 'src/prisma/prisma-client.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaClientService) {}
  private readonly logger = new Logger(UsersRepository.name);

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: Prisma.UserCreateInput) {
    this.logger.log(data);
    return this.prisma.user.create({ data });
  }
}
