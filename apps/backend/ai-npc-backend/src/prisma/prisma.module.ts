import { Module } from '@nestjs/common';
import { PrismaClientService } from './prisma-client/prisma-client.service';

@Module({
  providers: [PrismaClientService]
})
export class PrismaModule {}
