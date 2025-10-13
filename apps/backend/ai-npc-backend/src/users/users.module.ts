import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserMapper } from './user.mapper';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, UserMapper, UsersRepository],
  exports: [UsersService, UserMapper],
  controllers: [UsersController],
})
export class UsersModule {}
