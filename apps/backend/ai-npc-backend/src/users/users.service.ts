import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserMapper } from './user.mapper';
import { UserEntity } from './entities/user';
import { RegisterDTO } from 'src/auth/dtos/register.dto';
import { Role } from 'generated/prisma';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userMapper: UserMapper,
  ) {}
  private readonly users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      passwordHash: '$2b$10$abcdefghijk1234567890hashedpasswordexample',
      refreshTokenHash: null,
      avatarUrl: 'https://example.com/avatars/alice.png',
      role: Role.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      passwordHash: '$2b$10$lmnopqrstuv9876543210hashedpasswordexample',
      refreshTokenHash: null,
      avatarUrl: 'https://example.com/avatars/bob.png',
      role: Role.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    const userModel = await this.usersRepository.findByEmail(email);
    if (!userModel) return undefined;

    return this.userMapper.toDomain(userModel);
  }

  async create(
    userData: RegisterDTO,
    hashedPassword: string,
  ): Promise<UserEntity> {
    const userEntity = this.userMapper.fromRegisterDto(
      userData,
      hashedPassword,
    );

    const userModel = await this.usersRepository.create(userEntity);
    return this.userMapper.toDomain(userModel);
  }
}
